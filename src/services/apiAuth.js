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

	return data;
}

export async function getCurrentUser() {
	const { data: session } = await supabase.auth.getSession();

	if (!session.session) return null;

	let { data, error } = await supabase.auth.getUser();

	if (error) throw new Error(error.message);

	return data?.user;
}

export async function logout() {
	let { error } = await supabase.auth.signOut();

	if (error) throw new Error(error.message);
}
