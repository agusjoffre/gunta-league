import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import Link from "next/link";
import { Textarea } from "./ui/textarea";
type Props = {};

const TournamentInfoCard = (props: Props) => {
  return (
    <Card className="w-[355px]">
      <CardHeader className="flex flex-col items-center justify-center">
        <div>TOURNAMENT LOGO</div>
        <CardTitle className="font-black italic text-3xl text-accent">
          LEAGUE NAME
        </CardTitle>
        <CardDescription className="pt-7 flex flex-col gap-3 w-full">
          <div className="flex justify-between">
            <span className="text-foreground text-sm font-medium">DEPORTE</span>
            <span className="text-foreground text-sm font-medium">FIFA</span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground text-sm font-medium">FORMATO</span>
            <span className="text-foreground text-sm font-medium">
              Todos contra todos
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-foreground text-sm font-medium">EQUIPOS</span>
            <span className="text-foreground text-sm font-medium">9</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Textarea
          disabled
          value={"Descripcion del torneo. Lorem ipsum dolor sit amet. "}
          className="w-full font-medium italic max-h-36 min-h-36"
        />
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <Button variant={"linearAccent"} className="font-bold italic text-sm">
          EDITAR
        </Button>
        <Link href={"/"}>
          <Button variant={"accent"}>IR AL TORNEO</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TournamentInfoCard;
