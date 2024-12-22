"use server";
import { User } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { currentUser } from "@clerk/nextjs/server";

type Response = {
  success: boolean;
  data?: User;
  error: string | null;
};

export const getUser = async (): Promise<Response> => {
  const db = createClient();
  const clerkUser = await currentUser();

  if (!clerkUser) {
    return {
      error: "User not found",
      success: false,
    };
  }

  const clerkId = clerkUser.id;

  const { data, error } = await db
    .from("users")
    .select()
    .eq("clerk_id", clerkId)
    .single();

  if (error)
    return {
      error: error.message,
      success: false,
    };

  if (!data)
    return { error: "User not fetched. No data returned", success: false };

  return {
    data,
    error: null,
    success: true,
  };
};
