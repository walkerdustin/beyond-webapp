import { createClient } from '@supabase/supabase-js'
import { env } from '$env/dynamic/public'
import type { Database } from '$lib/database.types'
console.log("meta Base URL", import.meta.env.BASE_URL)
// @ts-ignore
export const supabase = createClient<Database>(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)

console.log(env.PUBLIC_SUPABASE_URL, env.PUBLIC_SUPABASE_ANON_KEY)
