import React from 'react';
import { UpdateGlobalComponentContext } from '../context';

const useUpdateGlobalComponentState = () => {
  const context = React.useContext(UpdateGlobalComponentContext);

  if (!context) {
    throw new Error(
      '[GlobalComponent] can not find context. make sure portal is exists.',
    );
  }

  return context;
};

export default useUpdateGlobalComponentState;
