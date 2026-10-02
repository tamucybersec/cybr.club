import data from "./new_data/photos.json";

interface Photo {
	title: string;
	description: string;
	path: string;
	embelishment?: string;
}

// The JSON is a list; pages still look photos up by id, e.g. photos.leadership
export const photos: Record<string, Photo> = Object.fromEntries(
	data.map(({ id, ...photo }) => [id, photo])
);
