import { RenderCommand } from '../../types/manager';
import GlobalComponentManager from './GlobalComponentManager';

class GlobalSnackBarManager extends GlobalComponentManager {
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

export default GlobalSnackBarManager;
