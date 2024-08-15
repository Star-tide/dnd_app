import { useState } from "react";
// my components
import {SignUp} from "./SignUp";
import { LogIn } from "./LogIn";
import { Loading } from "./Loading";
 
export const UserForms = () => {
  const [accountState, setAccountState] = useState(false);

  function FormDisplay({ currentLoginState }) {
    switch (currentLoginState) {
      case false:
        return <LogIn setAccountState={setAccountState} />;
      case true:
        return <SignUp setAccountState={setAccountState} />;
      default:
        return <Loading />;
    }
  }

  return (
    <>
      <main>
        <FormDisplay currentLoginState={accountState} />
      </main>
    </>
  );
};
