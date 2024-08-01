import { useContext } from "react";
import { AuthContext } from "@/app/AuthContext/page";
import { useRouter } from "next/navigation";
import Login from "../Auth/Login/page";

function Home() {
  const context: any = useContext(AuthContext);
  const router = useRouter();

  const { state, setState } = context;

  const logout = () => {
    setState(undefined);
  };

  return (
    <div>
      {state ? (
        <div>
          <p>Hello: {state.firstName}</p>
          <button onClick={logout}>Logout</button>
        </div>
      ) : (
        <>
          {/* <h1>Please Login</h1>
          <button onClick={login}>Login</button> */}
          <Login />
        </>
      )}
    </div>
  );
}

export default Home;
