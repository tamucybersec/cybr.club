import { getBackend } from "./build.js";

export function contentSource(env, development = false) {
	const configuredTarget = env.NEXT_PUBLIC_CMS_TARGET?.trim();
	if (
		configuredTarget &&
		configuredTarget !== "test" &&
		configuredTarget !== "production"
	) {
		throw new Error("NEXT_PUBLIC_CMS_TARGET must be test or production");
	}
	const target = configuredTarget || (development ? "test" : "production");
	const config = getBackend(
		target === "test" ? "config.local.yml" : "config.yml",
		env
	);
	const tokenVariable =
		target === "test" ? "GITHUB_TOKEN_LOCAL" : "GITHUB_TOKEN_PROD";
	return {
		target,
		repo: config.repo,
		root: `https://api.github.com/repos/${config.repo}/contents`,
		tokenVariable,
		token: env[tokenVariable]?.trim(),
	};
}
