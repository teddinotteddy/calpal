"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { signup } from "./actions";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

export default function Signup() {
  const { toast } = useToast();
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const result = await signup(formData);

    if (result.success) {
      toast({
        title: "Success",
        description: "Account created.",
      });

      router.push("/");
    } else {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive",
      });
    }
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Label htmlFor="username">Username</Label>
            <Input name="username" id="username" />
            <br />
            <Label htmlFor="password">Password</Label>
            <Input type="password" name="password" id="password" />
            <br />
            <div className="flex space-x-2">
              <Button>Continue</Button>
              <Link href="/login">
                <Button variant="link">Login</Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
