import React from 'react';
import {
  GlobalComponentContext,
  UpdateGlobalComponentContext,
} from './GlobalComponentContext';

export const useGlobalComponentState = <S>() => {
  const context = React.useContext(GlobalComponentContext);

  if (!context) {
    throw new Error(
      '[GlobalComponent] can not find context. make sure portal is exists.',
    );
  }

  return context as S;
};

export const useUpdateGlobalComponentState = () => {
  const context = React.useContext(UpdateGlobalComponentContext);

  if (!context) {
    throw new Error(
      '[GlobalComponent] can not find context. make sure portal is exists.',
    );
  }

  return context;
};
