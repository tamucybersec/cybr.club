"""Daily consistent SQLite snapshots; run with --once for a pre-upgrade backup."""
import argparse
from contextlib import closing
import logging
import os
from pathlib import Path
import sqlite3
import time


def snapshot(source: Path, destination: Path, retention_days: int = 30) -> Path:
    destination.mkdir(parents=True, exist_ok=True)
    output = destination / time.strftime("goatcounter-%Y%m%dT%H%M%SZ.sqlite3", time.gmtime())
    temporary = output.with_suffix(".tmp")
    try:
        # SQLite's backup API includes committed WAL data; copying the live
        # database file alone can silently lose recent visits.
        with closing(sqlite3.connect(f"{source.resolve().as_uri()}?mode=ro", uri=True)) as src:
            with closing(sqlite3.connect(temporary)) as dst:
                src.backup(dst)
                if dst.execute("PRAGMA integrity_check").fetchone() != ("ok",):
                    raise RuntimeError("Backup failed SQLite integrity check")
        os.chmod(temporary, 0o600)
        temporary.replace(output)
    finally:
        temporary.unlink(missing_ok=True)
    cutoff = time.time() - retention_days * 86400
    for old in destination.glob("goatcounter-*.sqlite3"):
        if old != output and old.stat().st_mtime < cutoff:
            old.unlink()
    return output


if __name__ == "__main__":
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--once", action="store_true")
    args = parser.parse_args()
    logging.basicConfig(level=logging.INFO)
    while True:
        try:
            result = snapshot(Path("/data/db.sqlite3"), Path("/backups"))
            logging.info("Created %s", result)
        except Exception:
            logging.exception("GoatCounter backup failed")
            if args.once:
                raise
            time.sleep(300)
            continue
        if args.once:
            break
        time.sleep(86400)
