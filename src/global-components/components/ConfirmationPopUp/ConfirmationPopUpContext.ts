import React from 'react';
import { GlobalComponentPropsList } from '@/types';

const ConfirmationPopUpContext = React.createContext<
  null | GlobalComponentPropsList['ConfirmationPopUp']
>(null);

export default ConfirmationPopUpContext;
