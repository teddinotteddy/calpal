import { validateRequest } from "@/validate-request";
import DataTable from "./components/data";
import Entries from "./components/entries";
import { getUserGoal } from "./actions";

export default async function Home() {
  const { user } = await validateRequest();

  if (user) {
    var goal = await getUserGoal(user.id);
  }

  return (
    <div className="text-center p-2">
      {user ? (
        <div className="space-y-4">
          <Entries />
          <DataTable goal={goal.goal} />
        </div>
      ) : (
        <div className="text-center">
          <h1 className="font-semibold text-lg">CalPal: Macro Tracker</h1>
          <p>Track your daily caloric, protein, and carb intake</p>
        </div>
      )}
    </div>
  );
}
