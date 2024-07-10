import { signOut } from "../actions";

export async function GET() {
  return signOut();
}
