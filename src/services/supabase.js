/**
 * External dependencies.
 */
import { createClient } from "@supabase/supabase-js";

/**
 * Internal dependencies.
 */

export const supabaseUrl = "https://gxacchlhhzelxmbmxggr.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imd4YWNjaGxoaHplbHhtYm14Z2dyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODg3ODY1ODUsImV4cCI6MjEwNDM2MjU4NX0.6Qq0xiV5pezhCZERlxd5AU6a9GK0KTpyA6jtagKDSWU";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
