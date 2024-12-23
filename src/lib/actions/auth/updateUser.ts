"use server";

import { User } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

type Response = {
  success: boolean;
  data?: User;
  error: string | null;
};

export const updateUser = async (
  user: Omit<User, "clerk_id">
): Promise<Response> => {
  const db = createClient();

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return {
      error: "User not found",
      success: false,
    };
  }

  const { data, error } = await db
    .from("users")
    .update(user)
    .eq("clerk_id", clerkUser.id)
    .select()
    .single();

  if (error)
    return {
      error: error.message,
      success: false,
    };

  if (!data)
    return { error: "User not updated. No data returned", success: false };

  return {
    data,
    error: null,
    success: true,
  };
};
