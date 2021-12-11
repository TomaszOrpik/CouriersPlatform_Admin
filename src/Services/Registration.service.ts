import { CONSTANTS } from "../Utilities/constants";
import { RegistrationRequest } from "../Store/Models/RegistrationRequest.model";
import { LocalStorageService } from "./LocalStorage.service";

export class RegistrationService {
  static async getRegistrations() {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
    };
    const response = await fetch(`${endpoint}registrations`, request).then(
      (response) => response.json().then((data) => data)
    );
    return response;
  }

  static async addRegistration(registrationRequest: RegistrationRequest) {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
      body: JSON.stringify(registrationRequest),
    };
    await fetch(
      `${endpoint}registrations/add-update-registration`,
      request
    );
  }

  static async validateRegistration(registrationRequest: RegistrationRequest) {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
      body: JSON.stringify(registrationRequest),
    };
    const response = await fetch(
      `${endpoint}registrations/validate-registration`,
      request
    ).then((response) => response.json().then((data) => data));
    return response;
  }
}
