import React from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {};

const SearchBar = (props: Props) => {
  return (
    <div className="flex items-center gap-1">
      <Button variant={"outline"} type="submit" className="border-accent">
        <Search width={20} height={20} />
      </Button>
      <Input type="search" placeholder="Buscar..." className="w-[300px]" />
      <Select>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Buscar por" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="tournaments">Torneos</SelectItem>
          <SelectItem value="users">Usuarios</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchBar;
