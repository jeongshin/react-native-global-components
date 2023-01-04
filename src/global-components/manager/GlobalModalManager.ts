import { Subject, timer } from 'rxjs';
import logger from '../../logger';
import { RemoveCommand, RenderCommand } from '../../types/manager';
import GlobalManager from './GlobalComponentManager';

class GlobalComponentManager extends GlobalManager {
  /**
   * delay in milliseconds to render next component
   */
  private delay: number;

  /**
   * flag screen in use
   */
  private locked = false;

  /**
   * component props list queue
   */
  private queue: RenderCommand[] = [];

  constructor(options: { delay: number }) {
    super();
    this.delay = options.delay;
  }

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
    Array.from(this.map).forEach(([name]) => {
      this.remove({ name });
    });
  }

  /**
   * change delay in ms
   * @param {number} delay
   */
  public setDelay(delay: number) {
    this.delay = delay;
  }
}

export default GlobalComponentManager;
