import { validateRequest } from "@/validate-request";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";

export default async function Header() {
  const { user } = await validateRequest();

  return (
    <div className="p-2">
      <div className="flex justify-between">
        <Link href="/" className="pb-2">
          <Button variant="ghost" className="text-3xl font-bold p-4">
            CalPal
          </Button>
        </Link>
        {!user ? (
          <Link href="/signup">
            <Button className="text-lg p-4">Signup</Button>
          </Link>
        ) : (
          <Link href="/logout">
            <Button className="text-lg p-4">Logout</Button>
          </Link>
        )}
      </div>
      <Separator />
    </div>
  );
}
