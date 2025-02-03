"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/button";
import { createCategory } from "@/actions/createCategory";

const formSchema = z.object({
  name: z
    .string({ message: "Informe o nome da categoria" })
    .min(1, { message: "Informe o nome da categoria" }),
});

export default function Category() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    await createCategory(data);
  }

  return (
    <main className="max-w-[720px] my-5 mx-auto py-0 px-4 flex flex-col">
      <h1 className="text-lg font-semibold">Nova categoria</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col my-4 mx-0 gap-4"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    className="h-10 bg-dark900 rounded-[8px] py-0 px-4 text-white border-none"
                    placeholder="Ex: pizzas"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button name="Cadastrar" />
        </form>
      </Form>
    </main>
  );
}
