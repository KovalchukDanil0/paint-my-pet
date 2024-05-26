import { signout } from "../actions";

export async function GET() {
  return signout();
}
