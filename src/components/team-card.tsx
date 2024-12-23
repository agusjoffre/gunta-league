import { Team } from "@/lib/types";
import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";
import Link from "next/link";

type Props = {
  team: Team;
};

const TeamCard = (props: Props) => {
  return (
    <Link href={`/teams/${props.team.id}`}>
      <div className="flex flex-col items-center gap-3 hover:scale-110 ease-in-out duration-300">
        <Image
          alt="team logo"
          src={props.team.logo_url || "/liga_gunta_2.png"}
          width={96}
          height={96}
          className="rounded-full min-w-24 min-h-24"
        />
        <span className="font-bold italic">{props.team.name}</span>
      </div>
    </Link>
  );
};

export default TeamCard;
