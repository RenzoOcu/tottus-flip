import { Navbar } from "@/components/Shared/Navbar";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function pageOrderError() {
  return (
    <div>
      <Navbar />
      <div className="p-6 mx-auto max-w-7xl">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <h1 className="text-2xl">
            !OPS! Ha parece que a accedido a un apartado de prueba 
          </h1>
          <Link href="/">
            <Button>Volver a ver los productos</Button>
          </Link>
        </div>
      </div>
    </div>
  );

  //4.10:21
}