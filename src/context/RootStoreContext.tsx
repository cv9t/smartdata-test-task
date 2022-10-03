import { createContext } from "react";
import RootStore from "../store/RootStore";

const RootStoreContext = createContext<RootStore | undefined>(undefined);

export default RootStoreContext;
