"use server";

import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

type Response = {
  success: boolean;
  email?: string;
  error: string | null;
};

export const getProfileEmail = async (): Promise<Response> => {
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
    .select("email")
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
    email: data.email,
  };
};
