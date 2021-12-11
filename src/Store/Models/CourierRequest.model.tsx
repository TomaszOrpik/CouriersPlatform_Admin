import { Position } from "./Position.model";

export interface CourierRegion {
    name: string;
    leftTop: Position,
    leftBottom: Position,
    rightTop: Position,
    rightBottom: Position,
}

export class CourierRequest {
    employeeNumber: string;
    firstName: string;
    lastName: string;
    password: string;
    phoneNumber: number;
    startPosition: Position;
    vehicle: string;
    registration: string;
    startTime: string;
    region: CourierRegion;
    deliveredPackages: string[];
    undeliveredPackages: string[];
    currentPackages: string;

    constructor(
        employeeNumber: string,
        firstName: string,
        lastName: string,
        password: string,
        phoneNumber: number,
        startPosition: Position,
        vehicle: string,
        registration: string,
        startTime: string,
        region: CourierRegion,
        deliveredPackages: string[],
        undeliveredPackages: string[],
        currentPackages: string,
    ) {
        this.employeeNumber = employeeNumber;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
        this.phoneNumber = phoneNumber;
        this.startPosition = startPosition;
        this.vehicle = vehicle;
        this.registration = registration;
        this.startTime = startTime;
        this.region = region;
        this.deliveredPackages = deliveredPackages;
        this.undeliveredPackages = undeliveredPackages;
        this.currentPackages = currentPackages;
    }
}