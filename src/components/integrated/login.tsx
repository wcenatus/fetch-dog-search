import { useState } from "react";
import { Button } from "@/components/simple/button/button";
import { Input } from "@/components/simple/input/input";
import { useAuth } from "@/context/auth-context";

export const Login = () => {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_API_BASE_URL);
    setLoading(true);
    await login({ email, name }).then(() => setLoading(false));
    // logout();
  };

  //   if (!isAuthenticated)
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <form onSubmit={handleLogin} className="flex md:max-w-1/3 flex-col gap-3">
        <div className=" left-0 right-0 top-0  max-h-full w-full items-center justify-center ">
          <div className="space-y-5 p-4">
            <h2 className="py-2 text-left text-xl font-semibold text-gray-900">
              Welcome to Fetch
            </h2>
            <Input
              name="name"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Button type="submit" fullWidth loading={loading}>
              Continue
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
