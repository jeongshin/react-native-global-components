import { Subject, timer } from 'rxjs';
import { GlobalComponentPropsList } from '@/types';

class GlobalComponentController<T extends { name: string }> {
  /**
   * delay in milliseconds to render next component
   */
  private delay = 300;

  /**
   * flag screen in use
   */
  private locked = false;

  /**
   * observable subject props
   */
  private subject = new Subject<T>();

  /**
   * component props list queue
   */
  private queue: T[] = [];

  /**
   * render component
   * if screen in use, push props and render later when screen is free.
   *
   * @param params {T}
   *
   * @returns {number} of component props in queue
   */
  public render(props: T): number {
    if (this.locked) {
      return this.queue.push(props);
    }

    this.locked = true;

    this.subject.next(props);

    return 0;
  }

  /**
   * notify screen is free to use.
   * render next component if exists in queue.
   *
   * @returns {void}
   */
  public next(): void {
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
   * get subject
   * @returns {Subject<T>} subject
   */
  public getSubject(): Subject<T> {
    return this.subject;
  }
}

export default new GlobalComponentController<{
  name: keyof GlobalComponentPropsList;
  props: GlobalComponentPropsList[keyof GlobalComponentPropsList];
}>();
