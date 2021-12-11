import { CONSTANTS } from "../Utilities/constants";
import { CourierRequest } from "../Store/Models/CourierRequest.model";
import { LocalStorageService } from "./LocalStorage.service";

export class CourierService {

  static async getCouriers() {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
    };
    const response = await fetch(`${endpoint}couriers`, request).then(
      (response) => response.json().then((data) => data)
    );
    return response;
  }

  static async addCourier(courier: CourierRequest) {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
      body: JSON.stringify(courier),
    };
    await fetch(
      `${endpoint}couriers/add-update-courier`,
      request
    );
  }

  static async validateCourier(courier: CourierRequest) {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
      body: JSON.stringify(courier),
    };
    const response = await fetch(
      `${endpoint}couriers/validate-courier`,
      request
    ).then((response) => response.json().then((data) => data));
    return response;
  }
}
