import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import MatchGoalsForm from "./match-goals-form";
import MatchScorersForm from "./match-scorers-form";
import MatchMVPForm from "./match-mvp-form";

type Props = {};

const MatchStatsCard = (props: Props) => {
  return (
    <Card className="w-[700px] min-h-[400px]">
      <CardHeader className="flex items-center justify-center">
        <CardTitle className="flex gap-4 items-center">
          <span className="text-accent font-black italic text-lg">
            PRIMERA VUELTA
          </span>
          <span className="text-foreground font-black italic text-base">
            Jornada 1
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-between">
        <div className="flex flex-col gap-7">
          <span>EQUIPO 1 IMAGEN</span>
          <p className="text-foreground text-xl">Equipo 1</p>
        </div>
        <div className="flex flex-col gap-10">
          <MatchGoalsForm />
          <MatchScorersForm />
        </div>
        <div className="flex flex-col gap-7">
          <span>EQUIPO 2 IMAGEN</span>
          <p className="text-foreground text-xl">Equipo 2</p>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-center">
        <MatchMVPForm />
      </CardFooter>
    </Card>
  );
};

export default MatchStatsCard;
