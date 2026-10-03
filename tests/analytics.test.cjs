const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const { test } = require("node:test");

function analytics() {
	const exports = {};
	const window = {
		location: {
			pathname: "/qr",
			search: "?utm_campaign=msc-poster&utm_source=msc&token=private",
		},
	};
	const context = {
		exports,
		window,
		URL,
		URLSearchParams,
		document: { referrer: "https://example.com/private?ticket=secret" },
		process: {
			env: { NEXT_PUBLIC_GOATCOUNTER_URL: "https://stats.example" },
		},
	};
	const compiled = ts.transpileModule(
		fs.readFileSync("src/lib/analytics.ts", "utf8"),
		{
			compilerOptions: {
				module: ts.ModuleKind.CommonJS,
				target: ts.ScriptTarget.ES2020,
			},
		}
	);
	vm.runInNewContext(compiled.outputText, context);
	return context;
}

test("only bounded campaign slugs are transmitted", () => {
	const { exports: a } = analytics();
	assert.equal(
		a.campaignQuery(
			"?utm_campaign=msc-poster&utm_source=msc&ticket=secret&token=private"
		),
		"utm_campaign=msc-poster&utm_source=msc"
	);
	assert.equal(
		a.campaignQuery(
			"?utm_campaign=user%40example.com&utm_source=" + "a".repeat(81)
		),
		""
	);
	assert.equal(
		a.safeReferrer("https://example.com/register?ticket=secret#fragment"),
		"https://example.com"
	);
	assert.equal(a.safeReferrer("javascript:alert(1)"), "");
	assert.ok(!a.PUBLIC_PATHS.includes("/register"));
	assert.ok(!a.PUBLIC_PATHS.includes("/dashboard"));
});

test("count.js query field is sanitized and QR events keep their names", () => {
	const { exports: a, window } = analytics();
	const calls = [];
	window.goatcounter = {
		get_data: () => ({ q: "?token=private", p: "/qr" }),
		count: (data) => calls.push(data),
	};
	a.prepareTracker();
	assert.equal(
		window.goatcounter.get_data().q,
		"utm_campaign=msc-poster&utm_source=msc"
	);
	a.trackQrClick("join");
	a.trackQrClick("learn-more");
	assert.deepEqual(
		calls.map((call) => call.path),
		["qr-join", "qr-learn-more"]
	);
	assert.equal(calls[0].event, true);
	assert.equal(calls[0].referrer, "campaign:msc-poster");
	window.location.pathname = "/register";
	a.trackQrClick("join");
	assert.equal(calls.length, 2);
});

test("missing or broken analytics never prevents an action", () => {
	const { exports: a, window } = analytics();
	assert.doesNotThrow(() => a.trackQrClick("join"));
	window.goatcounter = {
		count: () => {
			throw new Error("blocked");
		},
	};
	assert.doesNotThrow(() => a.trackQrClick("join"));
});
