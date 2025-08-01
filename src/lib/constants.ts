const isDev = process.env.NODE_ENV === "development";
export const API_URL = isDev
	? "http://localhost:5183"
	: "https://api.cybr.club";
