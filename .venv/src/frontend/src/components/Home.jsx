import { useState } from "react"
import { useOutletContext } from "react-router-dom";
import { Loading } from "./Loading"
import { AllCharactersSlide } from "./AllCharactersSlide";
import { AccountSlide } from "./AccountSlide";
import { Gemini } from "./Gemini";


export const Home = () => {

  const [viewState, setViewState ] = useState("gemini");
  const { user } = useOutletContext();

  const handleTabChange = (newViewState) => {
    console.log(viewState)
    setViewState(newViewState);
  };

  const DisplayHome = () => {
    switch (viewState) {
      case "home":
        return <AccountSlide />
      case "characters":
        return <AllCharactersSlide />
      case "gemini":
        return <Gemini />
      default:
        return <Loading />
    }
  }
  return (
    <>
      <DisplayHome viewState={viewState} />
    </>
  );
}
