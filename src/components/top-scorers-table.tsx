import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

type Props = {};

const TopScorersTable = (props: Props) => {
  return (
    <Table className="w-fit">
      <TableCaption>Goleadores del torneo</TableCaption>
      <TableHeader>
        <TableRow className="font-black italic text-lg">
          <TableHead className="text-foreground">Jugador</TableHead>
          <TableHead className="text-center text-foreground">Equipo</TableHead>
          <TableHead className="text-center text-foreground">Goles</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-bold italic">E. Cavani</TableCell>
          <TableCell className="flex items-center gap-3">
            <Image
              alt="user logo"
              src="/liga_gunta_2.png"
              width={15}
              height={15}
              className="rounded-full"
            />
            <span className="italic">IvanBoca</span>
          </TableCell>
          <TableCell className="text-center font-black italic">16</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TopScorersTable;
