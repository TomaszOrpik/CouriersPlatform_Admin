import { CONSTANTS } from "../Utilities/constants";
import { PackageRequest } from "../Store/Models/PackageRequest.model";
import { LocalStorageService } from "./LocalStorage.service";

export class PackageService {
  static async getPackages() {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
    };
    const response = await fetch(`${endpoint}packages`, request).then(
      (response) => response.json().then((data) => data)
    );
    return response;
  }

  static async addPackage(packageRequest: PackageRequest) {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
      body: JSON.stringify(packageRequest),
    };
    await fetch(
      `${endpoint}packages/add-update-package`,
      request
    );
  }

  static async validatePackage(packageRequest: PackageRequest) {
    const endpoint = CONSTANTS.API_ENDPOINT;
    const userToken = LocalStorageService.getElement('userToken');
    const request = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": userToken ?? ''
      },
      body: JSON.stringify(packageRequest),
    };
    const response = await fetch(
      `${endpoint}packages/validate-package`,
      request
    ).then((response) => response.json().then((data) => data));
    return response;
  }
}
