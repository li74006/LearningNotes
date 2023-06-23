import useAuthStore from "./store";
import useAuth from "./useAuth";

const LoginStatus = () => {
  // const { user, dispatch } = useAuth();

  // if (user)
  //   return (
  //     <div>
  //       <span className="mx-2">{user}</span>
  //       <a onClick={() => dispatch({ type: "LOGOUT" })} href="#">
  //         Logout
  //       </a>
  //     </div>
  //   );

  // return (
  //   <div>
  //     <a onClick={() => dispatch({ type: "LOGIN", message: "Hello ohcysp!" })} href="#">
  //       Login
  //     </a>
  //   </div>
  // );

  // refactor with zustand
  const { user, login, logout } = useAuthStore();
  if (user)
    return (
      <div>
        <span className="mx-2">{user}</span>
        <a onClick={() => logout()} href="#">
          Logout
        </a>
      </div>
    );

  return (
    <div>
      <a onClick={() => login("Hello Ohcysp")} href="#">
        Login
      </a>
    </div>
  );
};

export default LoginStatus;
