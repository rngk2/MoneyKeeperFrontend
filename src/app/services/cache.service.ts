export default class CacheService {
  public save<T = any>(key: string, value: NonNullable<T>): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  public get<T = any>(key: string): T | undefined {
    const item = sessionStorage.getItem(key);
    return (item === null || item === null as unknown as string) ? undefined : JSON.parse(item);
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

  public clear(): void {
    sessionStorage.clear();
  }
}
