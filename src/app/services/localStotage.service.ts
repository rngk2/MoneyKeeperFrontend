import { Injectable } from "@angular/core";
import { ArgumentError } from "../utils";

@Injectable()
export default class LocalStorageService {
  public save(key: string, obj: unknown): void {
    if (obj == null) {
      throw new ArgumentError('obj cannot be null | undefined');
    }
    localStorage.setItem(key, JSON.stringify(obj));
  }

  public get<T>(key: string): T | undefined {
    const element = localStorage.getItem(key);
    return element ? JSON.parse(element) as T : undefined;
  }

  public append(key: string, data: unknown): void {
    const element = localStorage.getItem(key);
    const updated = Object.assign(element || {}, data);
    localStorage.setItem(key, JSON.stringify(updated));
  }

  public remove(key: string): void {
    localStorage.removeItem(key);
  }
}
