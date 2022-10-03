import { RootStoreContext } from "../../context/RootStoreContext";
import { RootStore } from "../../store/RootStore";

interface RootStoreProviderProps {
  children: JSX.Element[] | JSX.Element | null;
}

const rootStore = new RootStore();

function RootStoreProvider({
  children,
}: RootStoreProviderProps): JSX.Element | null {
  return (
    <RootStoreContext.Provider value={rootStore}>
      {children}
    </RootStoreContext.Provider>
  );
}

export { RootStoreProvider };
