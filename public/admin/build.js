export const humanize = (k) =>
	k
		.replace(/([a-z0-9])([A-Z])/g, "$1 $2")
		.replace(/^./, (c) => c.toUpperCase());

const LONG_TEXT_MIN = 120; // maxLength above this -> multiline `text`

function stringWidget(s) {
	if (s.pattern?.startsWith("^/images/")) return "image";
	if (s.maxLength === undefined || s.maxLength > LONG_TEXT_MIN) return "text";
	return "string";
}

export function schemaToField(
	name,
	s,
	{ required = false, defaults = {} } = {}
) {
	const f = { label: humanize(name), name };
	if (!required) f.required = false;
	if (s["x-hint"]) f.hint = s["x-hint"];
	if (name in defaults) f.default = defaults[name];

	if (s.enum) return { ...f, widget: "select", options: s.enum };

	switch (s.type) {
		case "integer":
		case "number":
			f.widget = "number";
			f.value_type = s.type === "integer" ? "int" : "float";
			if (s.minimum !== undefined) f.min = s.minimum;
			if (s.maximum !== undefined) f.max = s.maximum;
			return f;
		case "string": {
			f.widget = stringWidget(s);
			if (f.widget === "image") return f;
			if (s.minLength !== undefined && s.minLength > 1)
				f.minlength = s.minLength;
			if (s.maxLength !== undefined) f.maxlength = s.maxLength;
			const pattern =
				s.format === "email"
					? "^[^@\\s]+@[^@\\s]+\\.[^@\\s]+$"
					: s.pattern;
			if (pattern) f.pattern = [pattern, s["x-hint"] ?? "Invalid format"];
			return f;
		}
		case "object":
			return { ...f, widget: "object", fields: schemaToFields(s) };
		case "array":
			if (s.items?.type !== "object")
				throw new Error(`"${name}": only arrays of objects supported`);
			f.widget = "list";
			f.label_singular = humanize(name).replace(/s$/, "");
			if (s.minItems !== undefined) f.min = s.minItems;
			f.fields = schemaToFields(s.items);
			return f;
		default:
			throw new Error(
				`"${name}": unsupported schema ${JSON.stringify(s)}`
			);
	}
}

export function schemaToFields(objSchema, { defaults = {} } = {}) {
	if (objSchema.type !== "object") throw new Error("expected object schema");
	const req = new Set(objSchema.required ?? []);
	return Object.entries(objSchema.properties ?? {}).map(([k, v]) =>
		schemaToField(k, v, { required: req.has(k), defaults })
	);
}

const TITLE_KEYS = ["title", "name"];

// Integer ids get a stopgap default of 1; string ids (e.g. photos) get none.
const idDefault = (props) => (props.id?.type === "integer" ? { id: 1 } : {});

export function schemaToFile(name, schema, overrides = {}) {
	if (schema.type !== "array" || schema.items?.type !== "object") {
		throw new Error(
			`${name}: top-level schema must be an array of objects`
		);
	}
	const props = schema.items.properties ?? {};
	const titleKey = TITLE_KEYS.find((k) => k in props);
	const summary = overrides.summary ?? (titleKey && `{{fields.${titleKey}}}`);
	if (!summary)
		throw new Error(
			`${name}: no title/name field; provide overrides.summary`
		);

	const label = overrides.label ?? schema.title ?? humanize(name);
	return {
		name,
		label,
		file: `data/${name}.json`,
		media_folder: `images/${name}`,
		public_folder: `/images/${name}`,
		fields: [
			{
				label,
				name: "items",
				widget: "list",
				root: true,
				label_singular:
					overrides.labelSingular ?? label.replace(/s$/, ""),
				summary,
				fields: schemaToFields(schema.items, {
					defaults: { ...idDefault(props), ...overrides.defaults },
				}),
			},
		],
	};
}

export const BACKEND = Object.freeze({
	name: "github",
	repo: "ashtonkopelevich/Test-Site-Content",
	branch: "master",
	base_url: "https://sveltia-cms-auth.testcybercms.workers.dev",
});

// `files` = array of schemaToFile() results.
export function buildConfig(files) {
	if (!files.length) throw new Error("no files given");
	const names = files.map((f) => f.name);
	if (new Set(names).size !== names.length)
		throw new Error("duplicate collection names");
	return {
		backend: { ...BACKEND },
		media_folder: "images",
		public_folder: "/images",
		collections: [{ name: "data", label: "Site Data", files }],
	};
}
