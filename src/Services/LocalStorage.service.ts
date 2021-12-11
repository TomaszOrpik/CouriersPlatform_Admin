export class LocalStorageService {
    static getElement(key: string): string | null {
        return localStorage.getItem(key);
    }

    static setElement(key: string, value: string) {
        localStorage.setItem(key, value);
    }
}