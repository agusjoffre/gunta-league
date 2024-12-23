"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import ProfileNameCard from "./profile-name-card";
import { useQuery } from "react-query";
import { getUser } from "@/lib/actions/auth/getUser";
import UserShow from "../auth/UserShow";
import { Loader2 } from "lucide-react";
import ProfileEmailCard from "./profile-email-card";
import ProfileFriendCode from "./profile-friendcode-card";
import ProfileEditDialog from "./profile-edit-dialog";

type Props = {};

const Profile = (props: Props) => {
  const { data, isLoading, error } = useQuery({
    queryFn: () => getUser(),
    queryKey: ["userInfo"],
  });

  const user = data?.data;

  return (
    <div className="flex items-center gap-4 min-h-full w-full px-32">
      <aside className="flex flex-col gap-4">
        {isLoading && (
          <p className="text-center">
            <Loader2 className="animate-spin" />
          </p>
        )}
        <UserShow imageSrc={user?.image_url} username={user?.username} />
      </aside>
      <Card className="w-full h-full border-none">
        <CardHeader className="flex flex-col gap-4">
          <div className="flex justify-end">
            <ProfileEditDialog email={user?.email || ""} name={user?.name} />
          </div>
          <div>
            <CardTitle className="text-2xl font-semibold italic">
              INFORMACION PERSONAL
            </CardTitle>
            <CardDescription>
              Aqui esta tu informacion personal. Puedes modificarla desde aqui.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="grid grid-cols-3 gap-4">
          <ProfileNameCard />
          <ProfileEmailCard />
          <ProfileFriendCode />
        </CardContent>
        <CardFooter>
          <Button variant={"destructive"}>ELIMINAR CUENTA</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
