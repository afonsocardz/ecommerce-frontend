import { useState, Dispatch, SetStateAction } from 'react';

export interface DisclosureHook {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

export default function useDisclosure() {
  const [open, setOpen] = useState(false);

  return {
    open,
    setOpen,
  };
}
