import Link from "next/link";
import UserShow from "./auth/UserShow";
import { createUser } from "@/lib/actions/authActions";
import { Button } from "./ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";

const Header = async () => {
  const createdUser = await createUser();
  const clerkUser = await currentUser();

  return (
    <header className="flex items-center justify-between px-4 py-7 shadow-sm shadow-gray-800 bg-gradient-to-t from-background to-accent/15">
      <Link href={"/"}>
        <h1 className="italic text-xl font-bold">GUNTA LEAGUE</h1>
      </Link>
      {createdUser.data ? (
        <UserShow
          username={createdUser.data.username}
          imageSrc={clerkUser?.imageUrl ? clerkUser?.imageUrl : undefined}
        />
      ) : (
        <Link href={"/sign-in"}>
          <Button>Sign In</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
