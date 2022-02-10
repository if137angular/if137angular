import { EmailValidator } from "@angular/forms";

export interface AuthResponsUserInterface {
  user: CurrentUserInterface
}

export interface CurrentUserInterface {
  bio: string | null,
  email: string,
  image: string,
  token: string,
  username: string,
}