export class LocalStorage {
    static get<T>(key: LocalStorageKey): T | null {
        const stored = localStorage.getItem(key);
        return stored ? JSON.parse(stored) as T : null;
    }

    static set(key: LocalStorageKey, value: any): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static clear(key: LocalStorageKey): void {
        localStorage.removeItem(key);
    }
}

type LocalStorageKey = 'user' | 'accessToken';