import React from 'react';
import type { UpdateStateProps } from '../types';

export const UpdateGlobalComponentContext =
  React.createContext<UpdateStateProps | null>(null);

export const GlobalComponentContext = React.createContext<unknown | null>(null);
