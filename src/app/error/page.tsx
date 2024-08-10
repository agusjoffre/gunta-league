import { Button } from "@/components/ui/button";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <main className="flex min-h-screen flex-col items-center gap-10 p-24">
      <h1 className="text-5xl font-bold">Oh, oh... Algo salio mal...</h1>
      <Link href={"/"}>
        <Button variant={"link"}>Ir al inicio</Button>
      </Link>
    </main>
  );
};

export default ErrorPage;
