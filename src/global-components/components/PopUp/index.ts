import createGlobalComponentFactory from '../../factory/createGlobalComponentFactory';
import PopUpManager from './PopUpManager';
import PopUpPortal from './PopUpPortal';

export default createGlobalComponentFactory({
  Portal: PopUpPortal,
  Manager: PopUpManager,
});
