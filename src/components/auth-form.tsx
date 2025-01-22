"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useContext, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { AuthContext } from "@/contexts/AuthContext";

const formSchema = z.object({
  email: z
    .string({ message: "Informe seu email" })
    .email({ message: "Email inválido" }),
  password: z
    .string({ message: "Informe sua senha" })
    .min(1, { message: "Informe sua senha" }),
});

export default function AuthForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { signIn } = useContext(AuthContext);

  const [passwordVisible, setPasswordVisible] = useState(false);

  async function handleSubmit(data: z.infer<typeof formSchema>) {
    await signIn(data);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-96 flex flex-col gap-8"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <div className="relative">
                <FormControl>
                  <Input
                    placeholder="Digite sua senha"
                    type={passwordVisible ? "text" : "password"}
                    {...field}
                  />
                </FormControl>
                <Button
                  size="icon"
                  type="button"
                  className="absolute right-0 top-0 h-full bg-white"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                >
                  {passwordVisible ? (
                    <Eye size={18} color="#000" />
                  ) : (
                    <EyeOff size={18} color="#000" />
                  )}
                </Button>
              </div>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="bg-red900 hover:bg-red900/50" type="submit">
          Acessar
        </Button>
      </form>
    </Form>
  );
}
