import GlobalComponentManager, {
  RenderCommand,
} from '../../core/manager/GlobalComponentManager';

class SnackbarManager extends GlobalComponentManager {
  constructor() {
    super();
  }
  /**
   * render component
   *
   * @param  {RenderCommand} command
   * @returns {void} of component props in queue
   */
  public render(command: RenderCommand): void {
    this.render$.next(command);
  }
}

export default new SnackbarManager();
