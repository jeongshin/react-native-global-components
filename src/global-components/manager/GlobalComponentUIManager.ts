import React from 'react';
import { GlobalComponentDisplayName } from '@/types';

class GlobalComponentUIManager {
  private map = new Map<GlobalComponentDisplayName, React.FC<any>>();

  /**
   * register custom component.
   * @param param.name {GlobalComponentDisplayName} name of global components
   * @param param.Component {React.FC<any>} function component to render
   */
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

  /**
   * get currently registered function component
   *
   * @param name {GlobalComponentDisplayName} name of global components
   * @returns null if not exists
   */
  public getRegisteredUIComponent<N extends GlobalComponentDisplayName>(
    name: N,
  ): React.FC<any> | null {
    return this.map.get(name) || null;
  }
}

export default new GlobalComponentUIManager();
