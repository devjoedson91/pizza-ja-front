"use server";

import { getCookieServer } from "@/lib/cookieServer";
import { api } from "@/services/api";
import { redirect } from "next/navigation";

interface CategoryProps {
  name: string;
}

export const createCategory = async (data: CategoryProps) => {
  const token = await getCookieServer();

  await api
    .post("/category", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .catch((error: any) => {
      console.log(error);
      return;
    });

  redirect("/dashboard");
};
