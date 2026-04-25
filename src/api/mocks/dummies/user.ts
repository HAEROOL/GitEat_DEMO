import { User } from "../../types/User";
import { AUTHOR } from "./personas";

export const UserData: User = {
  avatar_url: AUTHOR.avatarUrl,
  name: AUTHOR.displayName,
  id: String(AUTHOR.userId),
  email: AUTHOR.email,
  username: AUTHOR.username,
};
