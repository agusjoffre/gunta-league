import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { User } from "@/lib/types";
import { updateUser } from "@/lib/actions/auth/updateUser";
import { deleteUser } from "@/lib/actions/auth/deleteUser";
import { createUser } from "@/lib/actions/auth/createUser";

export async function POST(req: Request) {
  const SIGNING_SECRET = process.env.SIGNING_SECRET;

  if (!SIGNING_SECRET) {
    throw new Error(
      "Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local"
    );
  }

  // Create new Svix instance with secret
  const wh = new Webhook(SIGNING_SECRET);

  // Get headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response("Error: Missing Svix headers", {
      status: 400,
    });
  }

  // Get body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  let evt: WebhookEvent;

  // Verify payload with headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent;
  } catch (err) {
    console.error("Error: Could not verify webhook:", err);
    return new Response("Error: Verification error", {
      status: 400,
    });
  }

  // Do something with payload
  // For this guide, log payload to console
  const eventType = evt.type;
  if (eventType === "user.created") {
    if (evt.data.banned === true) {
      return new Response("Error: User is banned", {
        status: 400,
      });
    }

    const email = evt.data.email_addresses[0].email_address;
    const username = evt.data.username || email.split("@")[0];
    const clerkId = evt.data.id;
    const newUser: User = {
      image_url: evt.data.image_url,
      isAdmin: false,
      email,
      clerk_id: clerkId,
      username,
    };

    const { error: createUserError, success: createUserSuccess } =
      await createUser(newUser);

    if (createUserError) {
      console.error("Error: Could not create user:", createUserError);
      return new Response("Error: Could not create user", {
        status: 400,
      });
    }

    if (!createUserSuccess) {
      console.error("Error: Could not create user");
      return new Response("Error: Could not create user", {
        status: 400,
      });
    }

    return new Response("User created", {
      status: 200,
    });
  }

  if (eventType === "user.updated") {
    if (evt.data.banned === true) {
      return new Response("Error: User is banned", {
        status: 400,
      });
    }

    const email = evt.data.email_addresses[0].email_address;
    const username = evt.data.username || email.split("@")[0];
    const name = evt.data.first_name + " " + evt.data.last_name || undefined;
    const clerkId = evt.data.id;
    const updatedUser: User = {
      isAdmin: false,
      email,
      clerk_id: clerkId,
      username,
      name,
    };

    const { error: updateUserError, success: updateUserSuccess } =
      await updateUser(updatedUser);

    if (updateUserError) {
      console.error("Error: Could not update user:", updateUserError);
      return new Response("Error: Could not update user", {
        status: 400,
      });
    }

    if (!updateUserSuccess) {
      console.error("Error: Could not update user");
      return new Response("Error: Could not update user", {
        status: 400,
      });
    }

    return new Response("User updated", {
      status: 200,
    });
  }

  if (eventType === "user.deleted") {
    const id = evt.data.id;

    if (!id) {
      return new Response("Error: Could not delete user", {
        status: 400,
      });
    }

    const { error: deleteUserError, success: deleteUserSuccess } =
      await deleteUser(id);

    if (deleteUserError) {
      console.error("Error: Could not delete user:", deleteUserError);
      return new Response("Error: Could not delete user", {
        status: 400,
      });
    }

    if (!deleteUserSuccess) {
      console.error("Error: Could not delete user");
      return new Response("Error: Could not delete user", {
        status: 400,
      });
    }

    return new Response("User deleted", {
      status: 200,
    });
  }

  return new Response("Webhook received", { status: 200 });
}
