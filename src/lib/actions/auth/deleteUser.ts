"use server";

import { User } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";

type Response = {
  success: boolean;
  data?: User;
  error: string | null;
};

export const deleteUser = async (id: string): Promise<Response> => {
  const db = createClient();

  const { error } = await db.from("users").delete().eq("clerk_id", id);

  if (error)
    return {
      error: error.message,
      success: false,
    };

  return {
    error: null,
    success: true,
  };
};
