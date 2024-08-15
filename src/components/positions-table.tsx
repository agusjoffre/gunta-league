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

const PositionsTable = (props: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow className="font-bold text-lg italic">
          <TableHead className="w-4 text-foreground">Pos</TableHead>
          <TableHead className="text-foreground">Equipo</TableHead>
          <TableHead className="text-foreground">PJ</TableHead>
          <TableHead className="text-foreground">PG</TableHead>
          <TableHead className="text-foreground">PE</TableHead>
          <TableHead className="text-foreground">PP</TableHead>
          <TableHead className="text-foreground">GF</TableHead>
          <TableHead className="text-foreground">GC</TableHead>
          <TableHead className="text-foreground">DG</TableHead>
          <TableHead className="text-right text-foreground">Pts</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-hidden max-w-full">
        <TableRow className="bg-gradient-to-l from-accent/0 to-accent hover:bg-gradient-to-b hover:from-accent/20 hover:to-accent/50">
          <TableCell className="italic text-center bg-card font-black text-xl">
            1
          </TableCell>
          <TableCell className="flex items-center gap-3">
            <Image
              alt="user logo"
              src="/liga_gunta_2.png"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="font-bold text-lg">IvanBoca</span>
          </TableCell>
          <TableCell className="text-lg">10</TableCell>
          <TableCell className="text-lg">9</TableCell>
          <TableCell className="text-lg">1</TableCell>
          <TableCell className="text-lg">0</TableCell>
          <TableCell className="text-lg">45</TableCell>
          <TableCell className="text-lg">12</TableCell>
          <TableCell className="text-lg">34</TableCell>
          <TableCell className="text-right text-lg">28</TableCell>
        </TableRow>
        <TableRow className="">
          <TableCell className="italic text-center bg-card font-black text-xl">
            2
          </TableCell>
          <TableCell className="flex items-center gap-3">
            <Image
              alt="user logo"
              src="/liga_gunta_2.png"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="font-bold  text-lg">AgusPlay</span>
          </TableCell>
          <TableCell className="text-lg">10</TableCell>
          <TableCell className="text-lg">9</TableCell>
          <TableCell className="text-lg">1</TableCell>
          <TableCell className="text-lg">0</TableCell>
          <TableCell className="text-lg">45</TableCell>
          <TableCell className="text-lg">12</TableCell>
          <TableCell className="text-lg">34</TableCell>
          <TableCell className="text-right text-lg">24</TableCell>
        </TableRow>
        <TableRow className=" bg-gradient-to-l from-destructive/0 to-destructive hover:bg-gradient-to-b hover:from-destructive/20 hover:to-destructive/50">
          <TableCell className="italic text-center bg-card font-black text-xl">
            3
          </TableCell>
          <TableCell className="flex items-center gap-3">
            <Image
              alt="user logo"
              src="/liga_gunta_2.png"
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="font-bold  text-lg">Tumba</span>
          </TableCell>
          <TableCell className="text-lg">10</TableCell>
          <TableCell className="text-lg">9</TableCell>
          <TableCell className="text-lg">1</TableCell>
          <TableCell className="text-lg">0</TableCell>
          <TableCell className="text-lg">45</TableCell>
          <TableCell className="text-lg">12</TableCell>
          <TableCell className="text-lg">34</TableCell>
          <TableCell className="text-right text-lg">15</TableCell>
        </TableRow>
      </TableBody>
      <TableCaption>
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-accent rounded-md"></div>
          <span className="font-bold">Campeon</span>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-3 h-3 bg-destructive rounded-md"></div>
          <span className="font-bold">Ultimo</span>
        </div>
      </TableCaption>
    </Table>
  );
};

export default PositionsTable;
