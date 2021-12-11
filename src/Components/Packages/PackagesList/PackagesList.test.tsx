import { act } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { mount, ReactWrapper } from 'enzyme';
import thunk from 'redux-thunk';

import { Package } from "../../../Store/Models/Package.model";
import PackagesList from "./PackagesList";
import { createMockPackage } from "../../../Store/Models/Package.model.mock";



const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe('PackagesList component', () => {
    let wrapper: ReactWrapper;
    let mockPackages: Package[];
    let store: any;

    beforeEach(() => {
        mockPackages = [
            createMockPackage(),
            createMockPackage(),
            createMockPackage()
        ];
        store = mockStore({
            packages: {
                activePackageId: mockPackages[0].id
            }
        });
        wrapper = mount(<Provider store={store}>
            <PackagesList packages={mockPackages} />
        </Provider>);
    });

    test('display packages list', () => {
        const packagesListBody = wrapper.find('div.listBody').hostNodes();

        expect(packagesListBody.children().length).toEqual(mockPackages.length);
    });

    test('display packages with id filtered', () => {
        const searchInput = wrapper.find('#packageIdFilterInput').hostNodes();
        const searchedPackageId = mockPackages[0].id;
        const someInputValue = { target: { value: searchedPackageId } };
        const mockPackagesFiltered = mockPackages.filter((p) => p.id === searchedPackageId);

        act(() => {
            searchInput.simulate('change', someInputValue);
        });

        wrapper.setProps({});
        const packagesListBody = wrapper.find('div.listBody').hostNodes();
        expect(packagesListBody.children().length).toEqual(mockPackagesFiltered.length);
    });

    test('display packages with date filtered', () => {
        const searchInput = wrapper.find('#packageDateFilterInput').hostNodes();
        const searchedPackageDate = mockPackages[0].sendDate;
        const someInputValue = { target: { value: searchedPackageDate } };
        const mockPackagesFiltered = mockPackages.filter((p) =>
            p.sendDate.getFullYear() === searchedPackageDate?.getFullYear() &&
            p.sendDate.getMonth() === searchedPackageDate.getMonth() &&
            p.sendDate.getDay() === searchedPackageDate.getDay());

        act(() => {
            searchInput.simulate('change', someInputValue);
        });

        wrapper.setProps({});
        const packagesListBody = wrapper.find('div.listBody').hostNodes();
        expect(packagesListBody.children().length).toEqual(mockPackagesFiltered.length);
    });

    test('display packages with sender filter', () => {
        const searchInput = wrapper.find('#senderFilterInput').hostNodes();
        const searchedPackageSender = `${mockPackages[0].sender.firstName} ${mockPackages[0].sender.lastName}`;
        const someInputValue = { target: { value: searchedPackageSender } };
        const mockPackagesFiltered = mockPackages.filter((p) =>
            `${p.sender.firstName} ${p.sender.lastName}`.startsWith(searchedPackageSender)
            || `${p.sender.lastName} ${p.sender.firstName}`.startsWith(searchedPackageSender));

        act(() => {
            searchInput.simulate('change', someInputValue);
        });

        wrapper.setProps({});
        const packagesListBody = wrapper.find('div.listBody').hostNodes();
        expect(packagesListBody.children().length).toEqual(mockPackagesFiltered.length);
    });

    test('display packages with receiver filter', () => {
        const searchInput = wrapper.find('#receiverFilterInput').hostNodes();
        const searchedPackageReceiver = `${mockPackages[0].receiver.firstName} ${mockPackages[0].receiver.lastName}`;
        const someInputValue = { target: { value: searchedPackageReceiver } };
        const mockPackagesFiltered = mockPackages.filter((p) =>
            `${p.receiver.firstName} ${p.receiver.lastName}`.startsWith(searchedPackageReceiver)
            || `${p.receiver.lastName} ${p.receiver.firstName}`.startsWith(searchedPackageReceiver));

        act(() => {
            searchInput.simulate('change', someInputValue);
        });

        wrapper.setProps({});
        const packagesListBody = wrapper.find('div.listBody').hostNodes();
        expect(packagesListBody.children().length).toEqual(mockPackagesFiltered.length);
    });

    test('display packages with time filtered', () => {
        const searchInput = wrapper.find('#packageDateFilterInput').hostNodes();
        const searchedPackageDate = mockPackages[0].sendDate;
        const someInputValue = { target: { value: searchedPackageDate } };
        const mockPackagesFiltered = mockPackages.filter((p) =>
            p.sendDate.getFullYear() === searchedPackageDate?.getFullYear() &&
            p.sendDate.getMonth() === searchedPackageDate.getMonth() &&
            p.sendDate.getDay() === searchedPackageDate.getDay());

        act(() => {
            searchInput.simulate('change', someInputValue);
        });

        wrapper.setProps({});
        const packagesListBody = wrapper.find('div.listBody').hostNodes();
        expect(packagesListBody.children().length).toEqual(mockPackagesFiltered.length);
    });

    test('display packages with sender filter', () => {
        const searchInput = wrapper.find('#packageTimeInput').hostNodes();
        const searchedPackageTime = `${mockPackages[0].sendDate.getHours()}:${mockPackages[0].sendDate.getMinutes()}`;
        const someInputValue = { target: { value: searchedPackageTime } };
        const mockPackagesFiltered = mockPackages.filter((p) =>
            p.sendDate.getHours() === parseInt(searchedPackageTime.split(':')[0]) &&
            p.sendDate.getMinutes() === parseInt(searchedPackageTime.split(':')[1]));

        act(() => {
            searchInput.simulate('change', someInputValue);
        });

        wrapper.setProps({});
        const packagesListBody = wrapper.find('div.listBody').hostNodes();
        expect(packagesListBody.children().length).toEqual(mockPackagesFiltered.length);
    });

    test('display packages with status filtered', () => {
        const searchInput = wrapper.find('#statusInput').hostNodes();
        const searchedPackageStatus = mockPackages[0].status;
        const someInputValue = { target: { value: searchedPackageStatus } };
        const mockPackagesFiltered = mockPackages.filter((p) => p.status === searchedPackageStatus);

        act(() => {
            searchInput.simulate('change', someInputValue);
        });

        wrapper.setProps({});
        const packagesListBody = wrapper.find('div.listBody').hostNodes();
        expect(packagesListBody.children().length).toEqual(mockPackagesFiltered.length);
    });
});