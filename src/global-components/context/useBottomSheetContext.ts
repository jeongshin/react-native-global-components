import React from 'react';
import BottomSheetContext from '../../context/BottomSheetContext';

const useBottomSheetContext = () => {
  const context = React.useContext(BottomSheetContext);

  if (!context) {
    throw new Error(
      '[BottomSheetContext] useBottomSheetContext hook should be used in BottomSheetContext provider',
    );
  }

  return context;
};

export default useBottomSheetContext;
