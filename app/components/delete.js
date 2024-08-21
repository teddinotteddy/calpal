"use client";

import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { deleteUser } from "../account/actions";
import { Button } from "@/components/ui/button";

export default function Delete({ userId }) {
  const { toast } = useToast();
  const router = useRouter();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete your account? All account data will be permanently deleted.",
    );

    if (confirmed) {
      const result = await deleteUser(userId);

      if (result.success) {
        toast({
          title: "Success",
          description: "Account deleted.",
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
  }

  return (
    <Button variant="destructive" onClick={handleDelete}>
      Delete account
    </Button>
  );
}
