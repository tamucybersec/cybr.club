import { expect, test } from "vitest";

test("hello world", () => {
	expect("hello").not.toBe("world");
});
