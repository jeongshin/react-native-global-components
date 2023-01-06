import { RenderCommand } from '../../types/manager';
import GlobalComponentManager from '../manager/GlobalComponentManager';

class SnackBarManager extends GlobalComponentManager {
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

export default new SnackBarManager();
