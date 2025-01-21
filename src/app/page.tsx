import AuthForm from "@/components/auth-form";

export default function Home() {
  return (
    <div className="flex h-full justify-center items-center flex-col">
      <h1 className="mb-10 text-2xl">Logo Sistema</h1>

      <AuthForm />
    </div>
  );
}
