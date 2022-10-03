import RootStoreContext from "../context/RootStoreContext";
import RootStore from "../store/RootStore";
import { ChildrenType } from "../types";

interface RootStoreProviderProps {
  children: ChildrenType;
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

export default RootStoreProvider;
