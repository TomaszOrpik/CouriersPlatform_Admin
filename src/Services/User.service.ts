import { CONSTANTS } from "../Utilities/constants";
import { User } from "../Store/Models/User.model";
import { LocalStorageService } from "./LocalStorage.service";

export class UserService {
  static async getUsers() {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
    };
    const response = await fetch(`${endpoint}users`, request).then((response) =>
      response.json().then((data) => data)
    );
    return response;
  }
  static async addUser(user: User) {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
      body: JSON.stringify(user),
    };
    await fetch(
      `${endpoint}users/add-update-user`,
      request
    );
  }
  static async validateUser(user: User) {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
      body: JSON.stringify(user),
    };
    const response = await fetch(
      `${endpoint}users/validate-user`,
      request
    ).then((response) => response.json().then((data) => data));
    return response;
  }
}
