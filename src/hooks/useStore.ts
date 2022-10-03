import { useContext } from "react";
import RootStoreContext from "../context/RootStoreContext";
import RootStore from "../store/RootStore";

function useStore(): RootStore {
  const context = useContext(RootStoreContext);

  if (!context) {
    throw new Error("useStore was used outside of its Provider");
  }

  return context;
}

export default useStore;
