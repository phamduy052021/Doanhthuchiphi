/**
 * KV Store Helper Functions
 * Wrapper around kv_store.tsx với bug fixes
 */

import * as kv from "./kv_store.tsx";
import { createClient } from "jsr:@supabase/supabase-js@2.49.8";

// Fixed version of getByPrefix that returns both key and value
export async function getByPrefixFixed(prefix: string): Promise<Array<{ key: string; value: any }>> {
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL") || "",
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || ""
  );
  
  const { data, error } = await supabase
    .from("kv_store_80868a71")
    .select("key, value")
    .like("key", `${prefix}%`);

  if (error) {
    console.error("Error in getByPrefixFixed:", error);
    throw new Error(error.message);
  }

  return data || [];
}

// Re-export other functions
export const set = kv.set;
export const get = kv.get;
export const del = kv.del;
export const mset = kv.mset;
export const mget = kv.mget;
export const mdel = kv.mdel;
