import { validateRequest } from "@/validate-request";
import Logout from "../logout/logout";

export default async function Account() {
  const { user } = await validateRequest();

  return (
    <div className="space-y-2">
      <h1 className="text-center text-lg font-semibold">
        Account: {user.username}
      </h1>
      <Logout />
    </div>
  );
}
