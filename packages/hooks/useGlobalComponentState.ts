import React, { useContext } from 'react';
import { GlobalComponentContext } from '../context';

const useGlobalComponentState = <S>() => {
  const context = useContext(GlobalComponentContext);

  if (!context) {
    throw new Error(
      '[GlobalComponent] can not find context. make sure portal is exists.',
    );
  }

  return context as S;
};

export default useGlobalComponentState;
