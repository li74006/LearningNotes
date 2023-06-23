import { ReactNode, useReducer } from "react";

import AuthContext from "./authContext";

interface LoginAtcion {
  type: "LOGIN";
  message: string;
}

interface LogoutAction {
  type: "LOGOUT";
}

export type Action = LoginAtcion | LogoutAction;

const loginReducer = (state: string, action: Action): string => {
  switch (action.type) {
    case "LOGIN":
      return action.message;
    case "LOGOUT":
      return "";
  }
};

interface Props {
  children: ReactNode;
}

const AuthProvider = ({ children }: Props) => {
  const [user, dispatch] = useReducer(loginReducer, "");

  return <AuthContext.Provider value={{ user, dispatch }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
