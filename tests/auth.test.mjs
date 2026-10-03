import fs from "node:fs";
import vm from "node:vm";
import ts from "typescript";
import { expect, test, vi } from "vitest";

function setup(savedToken = null) {
	const fetch = vi.fn();
	const storage = { getItem: () => savedToken, setItem: vi.fn() };
	const compiled = ts.transpileModule(
		fs.readFileSync("src/lib/auth.ts", "utf8"),
		{
			compilerOptions: {
				module: ts.ModuleKind.CommonJS,
				target: ts.ScriptTarget.ES2020,
			},
		}
	);
	const context = {
		exports: {},
		fetch,
		localStorage: storage,
		URLSearchParams,
		require: (name) => {
			if (name === "react") return { useEffect: () => {} };
			if (name === "./constants")
				return { API_URL: "http://localhost:5183" };
			if (name === "@/lib/types")
				return {
					Permissions: {
						NONE: 0,
						SPONSOR: 1,
						COMMITTEE: 2,
						ADMIN: 3,
						SUPER_ADMIN: 4,
					},
				};
			throw new Error(`Unexpected import: ${name}`);
		},
	};
	vm.runInNewContext(compiled.outputText, context);
	const callback = vi.fn(),
		loading = vi.fn(),
		error = vi.fn();
	const login = context.exports.useLogin(callback, loading, error);
	return { fetch, storage, callback, loading, error, login };
}

test("connection failure during saved-token login is handled and manual retry succeeds", async () => {
	const s = setup("saved-token");
	s.fetch.mockRejectedValueOnce(new TypeError("Failed to fetch"));
	await expect(s.login()).resolves.toBeUndefined();
	expect(s.error).toHaveBeenLastCalledWith(
		expect.stringContaining("Cannot connect")
	);
	expect(s.loading).toHaveBeenLastCalledWith(false);
	expect(s.callback).not.toHaveBeenCalled();
	expect(s.storage.setItem).not.toHaveBeenCalled();
	s.fetch.mockResolvedValueOnce(new Response("2"));
	await s.login("retry&token");
	expect(s.error).toHaveBeenLastCalledWith(undefined);
	expect(s.callback).toHaveBeenLastCalledWith("retry&token", 2);
	expect(s.storage.setItem).toHaveBeenLastCalledWith("token", "retry&token");
	expect(s.fetch).toHaveBeenLastCalledWith(
		"http://localhost:5183/login?token=retry%26token"
	);
	expect(s.loading).toHaveBeenLastCalledWith(false);
});

test("invalid manual tokens retain the invalid-token feedback", async () => {
	const s = setup();
	s.fetch.mockResolvedValueOnce(new Response("0"));
	await s.login("invalid");
	expect(s.callback).toHaveBeenCalledWith("invalid", 0);
	expect(s.storage.setItem).not.toHaveBeenCalled();
	expect(s.loading).toHaveBeenLastCalledWith(false);
});

test.each([
	new Response("unavailable", { status: 503 }),
	new Response("broken"),
])("server failures never authenticate", async (response) => {
	const s = setup();
	s.fetch.mockResolvedValueOnce(response);
	await s.login("token");
	expect(s.error).toHaveBeenLastCalledWith(
		expect.stringContaining("dashboard API")
	);
	expect(s.callback).not.toHaveBeenCalled();
	expect(s.storage.setItem).not.toHaveBeenCalled();
	expect(s.loading).toHaveBeenLastCalledWith(false);
});
