import { useEffect, useState } from "react"
import { LogIn } from "../components/LogIn";
import { Home } from "../components/Home";
import { isUserLoggedIn } from "../utils/auth";
import { Loading } from "../components/Loading";

export const HomePage = () => {
  const [userAuthenticated, setUserAuth] = useState(null)

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     const loggedIn = await isUserLoggedIn();
  //     setUserAuth(loggedIn)

  //     if (loggedIn) {
  //       setUserAuth("home")
  //     } else { setUserAuth("login")}
  //   };
  //   checkLoginStatus();
  // }, []);



  function Display({ logged_in }) {
    switch(userAuthenticated) {
      case false:
        return <LogIn />
      case true:
        return <Home />
      default:
        return <Loading />
    }
  }

  return (
    <>
      <main className="w-full h-screen flex justify-center items-center">
        <Display logged_in={userAuthenticated} />
      </main>
    </>
  );
}
