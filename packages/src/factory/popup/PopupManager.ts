import { timer } from 'rxjs';
import GlobalComponentManager, {
  RenderCommand,
} from '../../core/manager/GlobalComponentManager';

export type PopupManagerConfigs = {
  delay?: number;
  useLock?: boolean;
  useMultiple?: boolean;
};

class PopupManager extends GlobalComponentManager {
  /**
   * delay in milliseconds to render next component
   */
  private delay: number;

  /**
   * flag screen in use
   */
  private locked = false;

  /**
   * use lock
   */
  private useLock = false;

  /**
   * allow multiple global components in screen
   */
  private useMultiple = true;

  /**
   * component name using screen
   */
  private component: string | null = null;

  /**
   * component props list queue
   */
  private queue: RenderCommand[] = [];

  constructor({
    delay = 300,
    useLock = false,
    useMultiple = true,
  }: PopupManagerConfigs = {}) {
    super();
    this.delay = delay;
    this.useLock = useLock;
    this.useMultiple = useMultiple;
  }

  private renderWithLock(command: RenderCommand) {
    if (this.locked) {
      this.queue.push(command);
      return;
    }

    this.locked = true;

    this.render$.next(command);
  }

  private renderWithoutLock(command: RenderCommand) {
    // TODO: how to do async?
    if (this.component) {
      this.remove({ name: this.component });
    }

    if (!this.useMultiple) {
      this.component = command.name;
    }

    this.render$.next(command);
  }

  /**
   * render component
   *
   * @param  {RenderCommand} command
   */
  public render(command: RenderCommand): void {
    if (this.useLock) {
      return this.renderWithLock(command);
    }

    return this.renderWithoutLock(command);
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
   * change configuration
   * @param {PopupManagerConfigs} configs
   */
  public setConfigs(configs: PopupManagerConfigs) {
    Object.assign(this, configs);
  }
}

export default new PopupManager();
