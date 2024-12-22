import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";

type Props = {};

const Profile = (props: Props) => {
  return (
    <div className="flex flex-col gap-4 min-h-full w-full">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-semibold italic">
            INFORMACION PERSONAL
          </CardTitle>
          <CardDescription>
            Aqui esta la informacion personal del usuario. Puedes modificarla
            desde aqui. aqui.
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
        <CardFooter>
          <Button variant={"linearAccent"}>EDITAR</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Profile;
