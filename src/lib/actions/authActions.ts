"use server";

import { currentUser } from "@clerk/nextjs/server";
import { User } from "@/lib/types.d";
import { createClient } from "@/utils/supabase/server";

type CreateUserResponse = {
  data: User | null;
  error: any;
  status: number;
  message: string;
  success: boolean;
  clerkExists: boolean;
  supabaseExists: boolean;
  created: boolean;
};

export const createUser = async (): Promise<CreateUserResponse> => {
  const supabase = createClient();

  const clerkUser = await currentUser();

  if (!clerkUser) {
    return {
      clerkExists: false,
      data: null,
      error: "User not found",
      message: "User not found",
      success: false,
      supabaseExists: false,
      status: 404,
      created: false,
    };
  }

  const newUser: User = {
    clerk_id: clerkUser.id,
    email: clerkUser.emailAddresses[0].emailAddress,
    isAdmin: false,
    name: clerkUser.fullName ? clerkUser.fullName : "",
    username: clerkUser.username ? clerkUser.username : "",
  };

  // check if already exists
  const { error: checkError, data: userData } = await supabase
    .from("users")
    .select("*")
    .eq("clerk_id", clerkUser.id);

  // si existe
  if (!checkError && userData.length > 0) {
    console.log("User already exists");
    return {
      clerkExists: true,
      data: userData[0],
      error: null,
      message: "User already exists",
      status: 200,
      success: true,
      supabaseExists: true,
      created: false,
    };
  }

  // si no existe, crear usuario
  const { data, error, status } = await supabase.from("users").insert({
    ...newUser,
  });

  console.log("User created");

  return {
    clerkExists: true,
    data,
    error,
    message: "User created",
    status,
    success: true,
    supabaseExists: false,
    created: true,
  };
};
