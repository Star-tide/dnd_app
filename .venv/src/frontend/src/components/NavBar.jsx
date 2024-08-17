import LogOutButton from "./LogOutButton";
export const NavBar = (user) => {
    
    const DisplayLogout = () => {
        if(user.user != null){
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
        <div className="navbar-start">
          <h1>Visionaire</h1>
        </div>
        <div className="navbar-center"></div>
        <div className="navbar-end gap-1">
          <div className="avatar placeholder">
            <div className="bg-neutral text-neutral-content w-6 rounded-full shadow-sm shadow-white">
              <span className="textl">S</span>
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
