import { validateRequest } from "@/validate-request";
import DataTable from "./components/data";
import Entries from "./components/entries";

export default async function Home() {
  const { user } = await validateRequest();

  return (
    <div className="text-center p-2">
      {user ? (
        <div className="space-y-4">
          <Entries />
          <DataTable />
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
