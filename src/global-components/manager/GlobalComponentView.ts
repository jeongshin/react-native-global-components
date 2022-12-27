import React from 'react';
import { GlobalComponentName } from '@/types';

class GlobalComponentView {
  private map = new Map<GlobalComponentName, React.FC<any>>();

  /**
   * register custom component.
   * @param param.name {GlobalComponentName} name of global components
   * @param param.Component {React.FC<any>} function component to render
   */
  public registerUIComponent<N extends GlobalComponentName>({
    name,
    Component,
  }: {
    name: N;
    Component: React.FC<any>;
  }): void {
    if (this.map.has(name)) {
      console.warn(
        '[GlobalComponentView] Component already registered. replace new component',
      );
      this.map.delete(name);
    }
    this.map.set(name, Component);
  }

  /**
   * get currently registered function component
   *
   * @param name {GlobalComponentName} name of global components
   * @returns null if not exists
   */
  public getRegisteredUIComponent<N extends GlobalComponentName>(
    name: N,
  ): React.FC<any> | null {
    if (!this.map.has(name))
      console.log(`[GlobalComponentView] Component ${name} is not registered`);

    return this.map.get(name) || null;
  }
}

export default new GlobalComponentView();
