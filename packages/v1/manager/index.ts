import { PopupContext } from '../types';

class PopupManager {
  private map = new Map<string, React.RefObject<PopupContext<any>>>();

  public registerRef(
    name: string,
    ref: React.RefObject<PopupContext<any>>,
  ): void {
    if (this.map.has(name)) return;
    this.map.set(name, ref);
  }

  /**
   * hide all current visible popups
   */
  public async hideAll(): Promise<boolean> {
    await Promise.all(
      Array.from(this.map).map(([_, popup]) => popup.current?.hide()),
    );
    return true;
  }
}

export default new PopupManager();
