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
    <main className="navbar">
        <div className='navbar-start'>
            <h1>
                Visionaire
            </h1>
        </div>
        <div className='navbar-center'></div>
        <div className='navbar-end'>
            <DisplayLogout />
        </div>
    </main>
    </>
  )
}
