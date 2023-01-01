import React from 'react';
import { UpdateStateProps } from '../../types';

export const UpdateGlobalComponentContext =
  React.createContext<UpdateStateProps | null>(null);

export const GlobalComponentContext = React.createContext<unknown | null>(null);
