import { validateRequest } from "@/validate-request";
import Logout from "../components/logout";
import Delete from "../components/delete";
import Goal from "../components/goal";

export default async function Account() {
  const { user } = await validateRequest();

  return (
    <div className="space-y-2">
      <h1 className="text-center text-lg font-semibold">
        Account: {user.username}
      </h1>
      <Goal />
      <div className="flex justify-center space-x-2">
        <Logout />
        <Delete userId={user.id} />
      </div>
    </div>
  );
}
