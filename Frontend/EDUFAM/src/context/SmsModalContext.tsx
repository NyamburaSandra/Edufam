import React, { createContext, useContext, useState } from 'react';

interface SmsModalContextType {
  show: boolean;
  open: (opts?: { parentName?: string; parentPhone?: string }) => void;
  close: () => void;
  parentName?: string;
  parentPhone?: string;
}

const SmsModalContext = createContext<SmsModalContextType | undefined>(undefined);

export const SmsModalProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false);
  const [parentName, setParentName] = useState<string | undefined>(undefined);
  const [parentPhone, setParentPhone] = useState<string | undefined>(undefined);

  const open = (opts?: { parentName?: string; parentPhone?: string }) => {
    setParentName(opts?.parentName);
    setParentPhone(opts?.parentPhone);
    setShow(true);
  };
  const close = () => {
    setShow(false);
    setParentName(undefined);
    setParentPhone(undefined);
  };

  return (
    <SmsModalContext.Provider value={{ show, open, close, parentName, parentPhone }}>
      {children}
    </SmsModalContext.Provider>
  );
};

export const useSmsModal = () => {
  const ctx = useContext(SmsModalContext);
  if (!ctx) throw new Error('useSmsModal must be used within SmsModalProvider');
  return ctx;
};
