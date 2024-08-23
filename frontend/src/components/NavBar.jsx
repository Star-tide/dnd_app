import { useOutletContext } from "react-router-dom";
import LogOutButton from "./LogOutButton";
export const NavBar = () => {

  const { user, viewState, setViewState } = useOutletContext();
    
    const DisplayLogout = () => {
        if(user){
            return (
                <div>
                    <LogOutButton />
                </div>
            )
        } else {
            return <></>
        }
    }
  return (
    <>
      <main className="navbar glass">
        <div className="navbar-start gap-2">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a onClick={() => setViewState("home")}>Account</a>
              </li>
              <li>
                <a onClick={() => setViewState("characters")}>Characters</a>
              </li>
              <li>
                <a onClick={() => setViewState("gemini")}>Rjordan</a>
              </li>
            </ul>
          </div>
          <h1>Visionaire</h1>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end gap-2">
          <div
            onClick={() => setViewState("home")}
            className="avatar placeholder"
          >
            <div className="bg-neutral text-neutral-content w-6 rounded-full shadow-sm shadow-white">
              <span className="textl">{user ? user.display_name[0] : "V"}</span>
            </div>
          </div>
          <div>
            <DisplayLogout />
          </div>
        </div>
      </main>
    </>
  );
}
