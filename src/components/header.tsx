import Link from "next/link";
import UserShow from "./auth/UserShow";
import { createUser } from "@/lib/actions/authActions";
import { Button } from "./ui/button";
import { SignOutButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import SearchBar from "./search-bar";

const Header = async () => {
  const createdUser = await createUser();
  const clerkUser = await currentUser();

  return (
    <header className="flex items-center justify-between px-4 py-4 shadow-sm shadow-gray-800 bg-gradient-to-t from-background to-accent/5">
      <div className="flex items-center gap-20">
        <div className="flex items-center justify-center gap-8">
          <Link href={"/"}>
            <h1 className="italic text-xl font-bold">GUNTA LEAGUE</h1>
          </Link>
          {createdUser.data && (
            <Link href={"/dashboard"}>
              <Button variant={"accent"} className="text-sm italic font-bold">
                CREAR TORNEO
              </Button>
            </Link>
          )}
        </div>
        {createdUser.data && (
          <div className="border-r-2 border-l-2 border-accent/40 px-11">
            <Link href={"/dashboard"}>
              <button className="hover:border-b-2 hover:border-accent text-sm font-bold italic">
                MIS TORNEOS
              </button>
            </Link>
          </div>
        )}
      </div>
      {createdUser.data ? (
        <div className="flex items-center gap-20">
          <SearchBar />

          <div className="flex items-center gap-12">
            <UserShow
              username={
                createdUser.data.username
                  ? createdUser.data.username
                  : createdUser.data.email
              }
              imageSrc={clerkUser?.imageUrl ? clerkUser?.imageUrl : undefined}
            />
            <SignOutButton>
              <Button variant={"destructive"}>CERRAR SESION</Button>
            </SignOutButton>
          </div>
        </div>
      ) : (
        <Link href={"/sign-in"}>
          <Button variant={"accent"}>INICIAR SESION</Button>
        </Link>
      )}
    </header>
  );
};

export default Header;
