import { GlobalComponentDisplayName } from '@/types';

class GlobalComponentStateManager {
  private map = new Map<GlobalComponentDisplayName, (...args: any) => void>();

  public subscribe(
    name: GlobalComponentDisplayName,
    cb: (...args: any) => void,
  ): () => void {
    if (this.map.has(name)) {
      throw new Error(
        '[GlobalComponentStateManager] subscription already exists',
      );
    }

    this.map.set(name, cb);

    return () => {
      this.map.delete(name);
    };
  }

  public show(name: GlobalComponentDisplayName, ...params: any): void {
    const cb = this.map.get(name);

    if (typeof cb !== 'function') {
      throw new Error(
        `[GlobalComponentStateManager] global component ${name} not implemented`,
      );
    }

    cb(...params);
  }
}

export default new GlobalComponentStateManager();
