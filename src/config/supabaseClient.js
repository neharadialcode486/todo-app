import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_ANON_KEY;

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL is not defined");
}

if (!supabaseKey) {
  throw new Error("NEXT_PUBLIC_ANON_KEY is not defined");
}

const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
