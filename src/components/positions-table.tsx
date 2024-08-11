import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {};

const PositionsTable = (props: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-4">Pos</TableHead>
          <TableHead>Equipo</TableHead>
          <TableHead>PJ</TableHead>
          <TableHead>PG</TableHead>
          <TableHead>PE</TableHead>
          <TableHead>PP</TableHead>
          <TableHead>GF</TableHead>
          <TableHead>GC</TableHead>
          <TableHead>DG</TableHead>
          <TableHead className="text-right">Pts</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow className="bg-gradient-to-l from-accent/0 to-accent hover:bg-gradient-to-b hover:from-accent/20 hover:to-accent/50">
          <TableCell className="text-center bg-card">1</TableCell>
          <TableCell className="flex items-center gap-3">
            <div>ESCUDO 1</div>
            <span className="font-bold italic">IvanBoca</span>
          </TableCell>
          <TableCell>10</TableCell>
          <TableCell>9</TableCell>
          <TableCell>1</TableCell>
          <TableCell>0</TableCell>
          <TableCell>45</TableCell>
          <TableCell>12</TableCell>
          <TableCell>34</TableCell>
          <TableCell className="text-right">28</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-center bg-card">2</TableCell>
          <TableCell className="flex items-center gap-3">
            <div>ESCUDO 2</div>
            <span className="font-bold italic">AgusPlay</span>
          </TableCell>
          <TableCell>10</TableCell>
          <TableCell>9</TableCell>
          <TableCell>1</TableCell>
          <TableCell>0</TableCell>
          <TableCell>45</TableCell>
          <TableCell>12</TableCell>
          <TableCell>34</TableCell>
          <TableCell className="text-right">24</TableCell>
        </TableRow>
        <TableRow className="bg-gradient-to-l from-destructive/0 to-destructive hover:bg-gradient-to-b hover:from-destructive/20 hover:to-destructive/50">
          <TableCell className="text-center bg-card">3</TableCell>
          <TableCell className="flex items-center gap-3">
            <div>ESCUDO 3</div>
            <span className="font-bold italic">Tumba</span>
          </TableCell>
          <TableCell>10</TableCell>
          <TableCell>9</TableCell>
          <TableCell>1</TableCell>
          <TableCell>0</TableCell>
          <TableCell>45</TableCell>
          <TableCell>12</TableCell>
          <TableCell>34</TableCell>
          <TableCell className="text-right">15</TableCell>
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
