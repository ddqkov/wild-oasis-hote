/**
 * External dependencies.
 */

import supabase from "@/services/supabase";

/**
 * Internal dependencies.
 */
import { supabaseUrl } from "@/services/supabase";

export async function getCabins() {
	let { data, error } = await supabase
		.from("cabins")
		.select("*")
		.order("created_at", { ascending: true });

	if (error) {
		console.error(error);

		throw new Error("Cabins could not be loaded");
	}

	return data;
}

export async function deleteCabin(id) {
	const { data, error } = await supabase.from("cabins").delete().eq("id", id);

	if (error) {
		console.error(error);

		throw new Error("Cabins could not be deleted");
	}

	return data;
}

export async function createEditFunction(newCabin, id) {
	const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);
	const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
		"/",
		"",
	);
	const imageURL = hasImagePath
		? newCabin.image
		: `${supabaseUrl}/storage/v1/object/public/cabins-images/${imageName}`;

	let query = supabase.from("cabins");

	if (!id) query = query.insert([{ ...newCabin, image: imageURL }]);

	if (id)
		query = query
			.update({ ...newCabin, image: imageURL })
			.eq("id", id)
			.select();

	const { data, error } = await query.select().single();

	if (error) {
		console.error(error);

		throw new Error("Cabins could not be created");
	}

	if (hasImagePath) return;

	const { error: storageError } = await supabase.storage
		.from("cabins-images")
		.upload(imageName, newCabin.image);

	if (storageError) {
		await supabase.from("cabins").delete().eq("id", data[0].id);

		console.error(storageError);

		throw new Error("Cabins image could not be loaded");
	}

	return data;
}
