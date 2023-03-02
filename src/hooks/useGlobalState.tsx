import React, { createContext, useState } from 'react';

type DispatchContextType<T> = React.Dispatch<React.SetStateAction<T>>;

export function createStateContext<T>(initialValue: T) {
  const Context = createContext(initialValue);
  const DispatchContext = createContext<DispatchContextType<T>>(() => {
    return;
  });

  const StateProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    const [state, dispatch] = useState(initialValue);

    return (
      <Context.Provider value={state}>
        <DispatchContext.Provider value={dispatch}>
          {children}
        </DispatchContext.Provider>
      </Context.Provider>
    );
  };

  // const useStateContext = () => useContext(Context);
  // const useDispatchContext = () => useContext(DispatchContext);

  return {
    Context,
    DispatchContext,
    StateProvider,
    // useStateContext,
    // useDispatchContext,
  };
}
