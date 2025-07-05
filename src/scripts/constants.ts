const isDev = import.meta.env.DEV;
export const API_URL = isDev ? "http://localhost:5183" : "https://api.cybr.club";
