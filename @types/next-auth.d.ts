import "next-auth";
import { Session as SessionImported } from "next-auth";

declare module "next-auth" {
  interface Session extends SessionImported {
    user: {
      id: string;
      email: string;
      name: string;
      image: string;
    };
  }
}
