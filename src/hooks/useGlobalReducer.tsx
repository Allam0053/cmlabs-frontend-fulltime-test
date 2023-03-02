import React, { createContext, useReducer } from 'react';

// type DispatchContextType<T> = React.Dispatch<React.SetStateAction<T>>;

export function createStateContext<StateType, ActionType>(
  initialValue: StateType,
  stateManager: (state: StateType, action: ActionType) => StateType
) {
  const Context = createContext(initialValue);
  const DispatchContext = createContext<React.Dispatch<ActionType>>(() => {
    return;
  });

  const StateProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
  }) => {
    // const [state, dispatch] = useState(initialValue);
    const [state, dispatch] = useReducer(stateManager, initialValue);

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
