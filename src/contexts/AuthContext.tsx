"use client";

import { useToast } from "@/hooks/use-toast";
import { api } from "@/services/api";
import { redirect } from "next/navigation";
import { createContext, ReactNode, useState } from "react";
import { destroyCookie, setCookie } from "nookies";

type UserProps = {
  id: string;
  name: string;
  email: string;
};

type SignInProps = {
  email: string;
  password: string;
};

type SignUpProps = {
  name: string;
  email: string;
  password: string;
};

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextData = {
  user: UserProps;
  signIn: (credentials: SignInProps) => Promise<void>;
};

export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  try {
    destroyCookie(undefined, "session");

    redirect("/");
  } catch (error) {
    console.log("erro ao deslogar: ", error);
  }
}

export function AuthProvider({ children }: AuthProviderProps) {
  const { toast } = useToast();

  const [user, setUser] = useState<UserProps>({
    id: "",
    email: "",
    name: "",
  });

  async function signIn({ email, password }: SignInProps) {
    try {
      const response = await api.post("/session", {
        email,
        password,
      });

      if (!response.data.token) return;

      const { token } = response.data;

      const expressTime = 60 * 60 * 24 * 30 * 1000;

      setCookie(undefined, "session", token, {
        maxAge: expressTime,
        path: "/",
      });

      //   (await cookies()).set("session", response.data.token, {
      //     maxAge: expressTime,
      //     path: "/",
      //     httpOnly: false,
      //     secure: process.env.NODE_ENV === "production",
      //   });
    } catch (error: any) {
      toast({
        title: "Não foi possível fazer o login",
        description: error.response.data.error,
        variant: "destructive",
      });

      return;
    }

    redirect("/dashboard");
  }

  //   async function signUp({ name, email, password }: SignUpProps) {
  //     try {
  //       const response = await api.post("/users", { name, email, password });

  //       toast.success("Conta criada com sucesso!");

  //       Router.push("/");
  //     } catch (err) {
  //       toast.error("Erro ao cadastrar");
  //       console.log("ERRO AO CADASTRAR: ", err);
  //     }
  //   }

  return (
    <AuthContext.Provider value={{ user, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
