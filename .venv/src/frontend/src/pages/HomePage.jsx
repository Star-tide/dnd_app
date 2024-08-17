import { UserForms } from "../components/UserForms";
import { Home } from "../components/Home";
import { Loading } from "../components/Loading";
import { useOutletContext } from "react-router-dom";
import { NavBar } from "../components/NavBar";

export const HomePage = () => {
  const { 
    user
   } = useOutletContext();

  console.log("homepage rendered")
   
  // Do some logic to check for user authentication via django api call

  function Display({ logged_in }) {
    switch(logged_in) {
      case false:
        return <UserForms />
      case true:
        return <Home />
      default:
        return <Loading />
    }
  }

  return (
    <>
      <NavBar user={user}/>
      <main className="w-full h-screen flex justify-center items-center">
        <Display logged_in={user ? true : false} />
      </main>
    </>
  );
}
