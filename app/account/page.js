import { validateRequest } from "@/validate-request";
import { getUserGoal } from "../actions";
import Logout from "../components/logout";
import Delete from "../components/delete";
import Goal from "../components/goal";

export default async function Account() {
  const { user } = await validateRequest();
  const goal = await getUserGoal(user.id);

  return (
    <div className="space-y-2">
      <h1 className="text-center text-lg font-semibold">
        Account: {user.username}
      </h1>
      <h1 className="text-center font-medium">
        Current goal/limit: {goal.goal && goal.goal.value}
      </h1>
      <Goal />
      <div className="flex justify-center space-x-2">
        <Logout />
        <Delete userId={user.id} />
      </div>
    </div>
  );
}
