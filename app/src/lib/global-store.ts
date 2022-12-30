import { writable } from "svelte/store";
import type { Writable } from "svelte/store";
import type { User } from "@supabase/supabase-js";

// export let user_store: Writable<User | null> = writable(null);
export let user_s: User | null = null;
export function set_user(user: User | null) {
  user_s = user;
}
