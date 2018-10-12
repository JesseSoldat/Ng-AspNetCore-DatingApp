// https://michalzalecki.com/why-using-localStorage-directly-is-a-bad-idea/
// https://github.com/MichalZalecki/storage-factory/blob/master/src/index.ts
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  inMemoryStorage: { [key: string]: string } = {};
  isSupported: boolean;

  constructor() {
    this.isSupported = this.checkIfIsSupported();
    console.log("Support for LocalStorage:", this.isSupported);
  }

  checkIfIsSupported() {
    try {
      const testKey = "__test_storage__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }

  clear(): void {
    if (this.isSupported) {
      localStorage.clear();
    } else {
      this.inMemoryStorage = {};
    }
  }

  key(index: number): string | null {
    if (this.isSupported) {
      return localStorage.key(index);
    } else {
      return Object.keys(this.inMemoryStorage)[index] || null;
    }
  }

  getItem(name: string): string | null {
    if (this.isSupported) {
      return localStorage.getItem(name);
    }
    if (this.inMemoryStorage.hasOwnProperty(name)) {
      return this.inMemoryStorage[name];
    }
    return null;
  }

  removeItem(name: string): void {
    if (this.isSupported) {
      localStorage.removeItem(name);
    } else {
      delete this.inMemoryStorage[name];
    }
  }

  setItem(name: string, value: string): void {
    if (this.isSupported) {
      localStorage.setItem(name, value);
    } else {
      this.inMemoryStorage[name] = value;
    }
  }
}
