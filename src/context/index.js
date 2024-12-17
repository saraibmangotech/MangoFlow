import { createContext, useContext } from "react";
import { AuthContext } from "./createContext";




export const useAuth = () => useContext(AuthContext);

