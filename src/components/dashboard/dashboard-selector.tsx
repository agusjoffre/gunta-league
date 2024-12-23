"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import DashboardTournaments from "./tournaments";
import Profile from "./profile";

type Props = {};

enum Selectors {
  TOURNAMENTS = "tournaments",
  PROFILE = "profile",
}

const DashboardSelector = (props: Props) => {
  const [selected, setSelected] = useState<Selectors>(Selectors.PROFILE);

  return (
    <div className="rounded-2xl border-x-2 border-accent min-h-[600px] w-full flex flex-col gap-16">
      <div className="flex items-center justify-center gap-8">
        <Button
          onClick={() => setSelected(Selectors.TOURNAMENTS)}
          variant={"outline"}
          className={cn(
            "italic py-8 px-10 font-black text-3xl",
            selected === Selectors.TOURNAMENTS ? "border-accent" : ""
          )}
        >
          TORNEOS
        </Button>
        <Button
          onClick={() => setSelected(Selectors.PROFILE)}
          variant={"outline"}
          className={cn(
            "italic py-8 px-10 font-black text-3xl",
            selected === Selectors.PROFILE ? "border-accent" : ""
          )}
        >
          PERFIL
        </Button>
      </div>

      <section className="w-full">
        {selected === Selectors.TOURNAMENTS && <DashboardTournaments />}
        {selected === Selectors.PROFILE && <Profile />}
      </section>
    </div>
  );
};

export default DashboardSelector;
