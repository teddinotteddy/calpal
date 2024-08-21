import { validateRequest } from "@/validate-request";
import Logout from "../logout/logout";

export default function Account() {
  const { user } = validateRequest();

  return (
    <div>
      <h1>Account: {user.username}</h1>
      <Logout />
    </div>
  );
}
