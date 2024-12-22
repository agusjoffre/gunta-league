"use server";

import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

type Response = {
  success: boolean;
  data?: string;
  error: string | null;
};

export const getProfileFriendCode = async (): Promise<Response> => {
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
    .select("friend_code")
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
      data,
    };
  }

  return {
    success: true,
    error: null,
    data: data.friend_code,
  };
};
