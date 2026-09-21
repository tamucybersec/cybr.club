// Plain (non-module) CSS files are handled by the bundler and have no exports.
// Declared here so side-effect imports like `import "@/css/main.css"` type-check.
declare module "*.css";
