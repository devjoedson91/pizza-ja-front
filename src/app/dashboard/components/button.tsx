import * as Btn from "@/components/ui/button";
import { useFormStatus } from "react-dom";

interface Props {
  name: string;
}

export function Button({ name }: Props) {
  const { pending } = useFormStatus();

  return (
    <Btn.Button
      type="submit"
      className="h-10 rounded-[8px] bg-green900 font-bold"
      disabled={pending}
    >
      {pending ? "Carregando..." : name}
    </Btn.Button>
  );
}
