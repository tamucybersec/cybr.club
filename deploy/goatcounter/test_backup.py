import importlib.util
from pathlib import Path
import sqlite3
import tempfile
import unittest

spec = importlib.util.spec_from_file_location("goatcounter_backup", Path(__file__).with_name("backup.py"))
backup = importlib.util.module_from_spec(spec)
spec.loader.exec_module(backup)


class BackupTests(unittest.TestCase):
    def test_snapshot_includes_live_wal_and_restores(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            source = root / "source.sqlite3"
            with sqlite3.connect(source) as db:
                db.execute("PRAGMA journal_mode=WAL")
                db.execute("CREATE TABLE visits (path TEXT)")
                db.execute("INSERT INTO visits VALUES ('/qr')")
                db.commit()
                snapshot = backup.snapshot(source, root / "backups")
                with sqlite3.connect(snapshot) as restored:
                    self.assertEqual(restored.execute("SELECT path FROM visits").fetchall(), [("/qr",)])
                    self.assertEqual(restored.execute("PRAGMA integrity_check").fetchone(), ("ok",))
                self.assertEqual(snapshot.stat().st_mode & 0o777, 0o600)
                self.assertFalse(list((root / "backups").glob("*.tmp")))

    def test_missing_database_does_not_create_empty_backup(self):
        with tempfile.TemporaryDirectory() as directory:
            root = Path(directory)
            with self.assertRaises(sqlite3.OperationalError):
                backup.snapshot(root / "missing.sqlite3", root / "backups")
            self.assertFalse(list((root / "backups").iterdir()))


if __name__ == "__main__":
    unittest.main()
