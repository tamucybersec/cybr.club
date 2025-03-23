import type { Credentials } from "./dashboardConnection";

function pemToArrayBuffer(pem: string): ArrayBuffer {
	const base64 = pem.replace(/-{5}[^-]+-{5}/g, "").replace(/\s/g, "");
	return Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer;
}

export async function importKey(key: string): Promise<CryptoKey> {
	return await window.crypto.subtle.importKey(
		"spki",
		pemToArrayBuffer(key),
		{
			name: "RSA-OAEP",
			hash: { name: "SHA-256" },
		},
		true,
		["encrypt"]
	);
}

async function encrypt(
	key: CryptoKey,
	message: string
): Promise<string> {
	// Encrypt message
	const encodedMessage = new TextEncoder().encode(message);
	const encrypted = await window.crypto.subtle.encrypt(
		{ name: "RSA-OAEP" },
		key,
		encodedMessage
	);

	// Convert encrypted data to base64
	return btoa(String.fromCharCode(...new Uint8Array(encrypted)));
}

export async function encryptCredentials(
	key: CryptoKey,
	username: string,
	password: string
): Promise<Credentials> {
	return {
		username: await encrypt(key, username),
		password: await encrypt(key, password),
	};
}
