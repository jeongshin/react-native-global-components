import createSnackBarFactory from '../factory/createSnackBarFactory';
import SnackBarManager from './SnackBarManager';
import SnackBarPortal from './SnackBarPortal';

export default createSnackBarFactory({
  Portal: SnackBarPortal,
  Manager: SnackBarManager,
});
