"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

type Role = "ADMIN" | "WAITER" | "KITCHEN";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<Role>("WAITER");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const login = async () => {
    if (!email || !password || !role) {
      toast.error("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await res.json();

      if (!data.success) {
        toast.error("Invalid credentials or role");
        return;
      }

      toast.success("Login successful");

      if (data.role === "ADMIN") router.push("/admin");
      if (data.role === "WAITER") router.push("/waiter");
      if (data.role === "KITCHEN") router.push("/kitchen");

    } catch (err) {
      toast.error("Login failed");
      console.log(err)
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-950 px-4">
      <Card className="w-full max-w-sm bg-neutral-900 border border-neutral-800">
        <CardContent className="p-6 space-y-5">
          <h1 className="text-center text-lg font-semibold text-emerald-500">
            Staff Login
          </h1>

          <p className="text-xs text-center text-gray-400">
            Only Admin, Waiter & Kitchen staff can login
          </p>

          {/* ROLE */}
          <Select value={role} onValueChange={(v) => setRole(v as Role)}>
            <SelectTrigger className="bg-neutral-950 text-white border-neutral-800">
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="WAITER">Waiter</SelectItem>
              <SelectItem value="KITCHEN">Kitchen</SelectItem>
            </SelectContent>
          </Select>

          {/* USERNAME */}
          <Input
            placeholder="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-neutral-950 text-white border-neutral-800"
          />

          {/* PASSWORD */}
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-neutral-950 text-white border-neutral-800"
          />

          {/* BUTTON */}
          <Button
            className="w-full bg-emerald-600 hover:bg-emerald-700"
            onClick={login}
            disabled={loading}
          >
            {loading ? "Logging in…" : "Login"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
