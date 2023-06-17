import React from 'react';

import { useNuiEvent } from '@/shared/hooks/useNuiEvent';

function Wrapper({ children }) {
  const [isOpened, setIsOpened] = React.useState(false);

  useNuiEvent('show', setIsOpened);

  if (!isOpened) return null;

  return children
}

export default Wrapper;