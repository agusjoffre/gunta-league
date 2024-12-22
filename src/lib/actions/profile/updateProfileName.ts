"use server";

import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

type Response = {
  success: boolean;
  newName?: string;
  error: string | null;
};

export const updateProfileName = async (newName: string): Promise<Response> => {
  const user = await currentUser();

  if (!user) {
    return {
      success: false,
      error: "User not found",
    };
  }

  const db = createClient();

  const { error, data } = await db
    .from("users")
    .update({ name: newName })
    .eq("clerk_id", user.id)
    .select()
    .single();

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  if (!data) {
    return {
      success: false,
      error: "No data returned",
    };
  }

  return {
    success: true,
    error: null,
    newName: data.name,
  };
};
