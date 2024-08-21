import { logout } from "../actions";
import { Button } from "@/components/ui/button";

export default async function Logout() {
  return (
    <div className="flex justify-center">
      <form action={logout}>
        <Button>Logout</Button>
      </form>
    </div>
  );
}
