import { logout } from "./actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default async function Logout() {
  return (
    <div className="flex justify-center">
      <Card className="max-w-md p-5">
        <CardHeader>
          <CardTitle>Logout</CardTitle>
        </CardHeader>
        <CardContent>
          <form action={logout}>
            <Button>Logout</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
