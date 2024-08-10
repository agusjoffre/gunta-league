import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";

type Props = {
  username?: string;
  imageSrc?: string;
};

const UserShow = ({ username, imageSrc }: Props) => {
  return (
    <div className="flex items-center justify-center gap-3">
      <div className="relative h-12 w-12">
        <Image
          alt="user avatar"
          src={imageSrc ? imageSrc : "/vercel.svg"}
          fill
          className="rounded-full border-2 border-background bg-white"
        />
      </div>
      {username && username.length > 0 && (
        <p className="text-sm font-medium">{username}</p>
      )}
    </div>
  );
};

export default UserShow;
