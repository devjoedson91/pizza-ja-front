import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

export function Orders() {
  return (
    <main className="max-w-[720px] my-5 mx-auto py-0 px-4 flex justify-between flex-col">
      <section className="flex gap-4 mb-4 mt-6 items-center">
        <h1 className="font-semibold text-lg">Últimos pedidos</h1>
        <Button>
          <RefreshCw size={24} />
        </Button>
      </section>

      <section className="flex gap-4 flex-col">
        <Button className="flex justify-start h-16 p-0 bg-dark900 text-lg rounded-[8px] gap-4 hover:brightness-150">
          <div className="w-2 bg-green900 h-full rounded-tl-[8px] rounded-bl-[8px]" />
          <span>Mesa 10</span>
        </Button>
      </section>
    </main>
  );
}
