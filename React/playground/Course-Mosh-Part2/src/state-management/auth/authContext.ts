import React from "react";
import { Dispatch } from "react";
import { Action } from "./AuthProvider";

interface AuthContextType {
  user: string;
  dispatch: Dispatch<Action>;
}

const AuthContext = React.createContext<AuthContextType>({} as AuthContextType);

export default AuthContext;
