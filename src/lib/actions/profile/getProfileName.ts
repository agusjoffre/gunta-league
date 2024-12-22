"use server";

import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

type Response = {
  success: boolean;
  name?: string;
  error: string | null;
};

export const getProfileName = async (): Promise<Response> => {
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
    .select("name")
    .eq("clerk_id", user.id)
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
    name: data.name,
  };
};
