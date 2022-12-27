import React from 'react';
import { GlobalComponentDisplayName } from '@/types';

class GlobalComponentUIManager {
  private map = new Map<GlobalComponentDisplayName, React.FC<any>>();

  public registerUIComponent<N extends GlobalComponentDisplayName>({
    name,
    Component,
  }: {
    name: N;
    Component: React.FC<any>;
  }): void {
    if (this.map.has(name)) {
      console.warn(
        '[GlobalComponentUIManager] Component already registered. replace new component',
      );
      this.map.delete(name);
    }
    this.map.set(name, Component);
  }

  public getRegisteredUIComponent<N extends GlobalComponentDisplayName>(
    name: N,
  ): React.FC<any> | null {
    return this.map.get(name) || null;
  }
}

export default new GlobalComponentUIManager();
