import { Subject, timer } from 'rxjs';

type RenderCommand = { name: string; props: any };
type RemoveCommand = { name: string };

class GlobalComponentManager {
  private map = new Map<string, React.FC<any>>();

  constructor({ delay = 300 }: { delay?: number } = {}) {
    this.delay = delay;
  }

  /**
   * delay in milliseconds to render next component
   */
  private delay: number;

  /**
   * flag screen in use
   */
  private locked = false;

  /**
   * observable for render command
   */
  private render$ = new Subject<RenderCommand>();

  /**
   * observable for remove command
   */
  private remove$ = new Subject<RemoveCommand>();

  /**
   * component props list queue
   */
  private queue: RenderCommand[] = [];

  /**
   * render component
   * if screen in use, push props and render later when screen is free.
   *
   * @param  {RenderCommand} command
   * @returns {void} of component props in queue
   */
  public render(command: RenderCommand): void {
    if (this.locked) {
      this.queue.push(command);
      return;
    }

    this.locked = true;

    this.render$.next(command);

    return;
  }

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
   * notify screen is free to use.
   * render next component if exists in queue.
   */
  public complete(): void {
    this.locked = false;

    const props = this.queue.shift();

    if (!props) return;

    timer(this.delay).subscribe(() => {
      this.render(props);
    });
  }

  /**
   * clear queue & screen
   */
  public clear(): void {
    this.queue = [];
    this.locked = false;
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
   * change delay in ms
   * @param {number} delay
   */
  public setDelay(delay: number) {
    this.delay = delay;
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
      console.warn(
        '[GlobalComponentManager] Component already registered. name should be unique.',
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
    if (!this.map.has(name))
      console.log(
        `[GlobalComponentManager] Component ${name} is not registered`,
      );

    return this.map.get(name) || null;
  }
}

export default GlobalComponentManager;
