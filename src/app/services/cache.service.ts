export default class CacheService {
  public save<T = any>(key: string, value: NonNullable<T>): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public get<T = any>(key: string): T | null {
    const item = sessionStorage.getItem(key);
    return (item === null || item === null as unknown as string) ? null : JSON.parse(item);
  }

  public update<T = any>(key: string, newValue: NonNullable<T>): void {
    this.save(key, newValue);
  }

  public remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  public isFresh(key: string): boolean {
    return !!sessionStorage.getItem(key);
  }

  public makeFresh(key: string): void {
    sessionStorage.setItem(key, 'fresh');
  }

  public clear(): void {
    sessionStorage.clear();
  }

}
