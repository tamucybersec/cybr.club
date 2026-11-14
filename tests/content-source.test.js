import { describe, expect, it } from "vitest";
import { contentSource } from "../scripts/content-source.mjs";

describe("content sync source", () => {
	const tokens = {
		GITHUB_TOKEN_LOCAL: "test-token",
		GITHUB_TOKEN_PROD: "production-token",
	};

	it("defaults development to the test repository and local token", () => {
		expect(contentSource(tokens, true)).toMatchObject({
			target: "test",
			repo: "ashtonkopelevich/Test-Site-Content",
			token: "test-token",
		});
	});

	it("defaults builds to the production repository and token", () => {
		expect(contentSource(tokens)).toMatchObject({
			target: "production",
			repo: "tamucybersec/Site-Content",
			token: "production-token",
		});
	});

	it.each([
		["production", true, "production-token"],
		["test", false, "test-token"],
	])(
		"honors the %s override regardless of development mode",
		(target, dev, token) => {
			expect(
				contentSource(
					{ ...tokens, NEXT_PUBLIC_CMS_TARGET: target },
					dev
				)
			).toMatchObject({ target, token });
		}
	);

	it("does not fall back to another environment's or the legacy token", () => {
		expect(
			contentSource({
				GITHUB_TOKEN_LOCAL: "test",
				GITHUB_TOKEN: "legacy",
			})
		).toMatchObject({
			tokenVariable: "GITHUB_TOKEN_PROD",
			token: undefined,
		});
		expect(
			contentSource({ GITHUB_TOKEN_PROD: "prod" }, true)
		).toMatchObject({
			tokenVariable: "GITHUB_TOKEN_LOCAL",
			token: undefined,
		});
	});

	it("rejects invalid target names instead of syncing the wrong repository", () => {
		expect(() => contentSource({ NEXT_PUBLIC_CMS_TARGET: "prod" })).toThrow(
			"NEXT_PUBLIC_CMS_TARGET must be test or production"
		);
	});

	it("uses the CMS repository for both data and images without pinning a branch", () => {
		for (const development of [true, false]) {
			const source = contentSource(tokens, development);
			expect(source.root).toBe(
				`https://api.github.com/repos/${source.repo}/contents`
			);
		}
	});
});
