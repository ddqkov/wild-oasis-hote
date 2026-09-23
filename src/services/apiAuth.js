/**
 * External dependencies.
 */

/**
 * Internal dependencies.
 */
import supabase from "@/services/supabase";

export async function login({ email, password }) {
	let { data, error } = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) throw new Error(error.message);

	console.log(data);

	return data;
}
