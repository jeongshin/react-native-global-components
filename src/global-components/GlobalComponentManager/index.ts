import { Subject } from 'rxjs';
import logger from '../../logger';

class GlobalComponentManager {
  protected map = new Map<string, React.FC<any>>();

  /**
   * observable for render command
   */
  protected render$ = new Subject<RenderCommand>();

  /**
   * observable for remove command
   */
  protected remove$ = new Subject<RemoveCommand>();

  /**
   * unmount component if component is mounted.
   *
   * nothing happens if component is not mounted.
   *
   * @param {RemoveCommand} command
   */
  public remove(command: RemoveCommand): void {
    this.remove$.next(command);
  }

  /**
   * get observable for render command
   * @returns {Subject<RenderCommand>} subject
   */
  public observeRender(): Subject<RenderCommand> {
    return this.render$;
  }

  /**
   * get observable for remove command
   * @returns {Subject<RenderCommand>} subject
   */
  public observeRemove(): Subject<RemoveCommand> {
    return this.remove$;
  }

  /**
   * register custom component.
   * @param {string} param.name  name of global components
   * @param {React.FC<any>} param.Component  function component to render
   */
  public setComponent({
    name,
    Component,
  }: {
    name: string;
    Component: React.FC<any>;
  }): void {
    if (this.map.has(name)) {
      logger.log(
        'Component already registered. name should be unique.\nBut it is safe to ignore this warning if it occurred because of hot module replacement.',
      );
      return;
    }

    this.map.set(name, Component);
  }

  /**
   * get currently registered function component
   *
   * @param {string} name name of global components
   * @returns null if not exists
   */
  public getComponent(name: string): React.FC<any> | null {
    if (!this.map.has(name)) logger.log(`Component ${name} is not registered`);

    return this.map.get(name) || null;
  }
}

export type RenderCommand = { name: string; props: any };

export type RemoveCommand = { name: string };

export default GlobalComponentManager;
