import { CONSTANTS } from "../Utilities/constants";
import { LocalStorageService } from "./LocalStorage.service";

export class AuthService {
  static async validate(login: string, password: string): Promise<boolean | undefined> {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const request = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ login, password }),
    };
    const response = await fetch(`${endpoint}users/login_admin`, request).then(
      (response) => response.json().then((data) => data)
    );
    if (response) {
      LocalStorageService.setElement('userToken', response.token.userToken);
      LocalStorageService.setElement('mapToken', response.token.mapToken);
      return response.canWrite;
    } else return undefined;
  }
}
