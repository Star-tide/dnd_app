import { logOut } from "../utils/auth"
import { useOutletContext } from "react-router-dom";

function LogOutButton() {

    const { setUser } = useOutletContext();

    const handleLogOut = async () => {
        logOut()
        setUser(null)
    }
  return (
    <>
    <button onClick={ handleLogOut } className="btn btn-sm rounded">
      Logout
    </button>
    </>
  );
}

export default LogOutButton