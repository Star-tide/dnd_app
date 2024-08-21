import { useState } from "react"
import { useOutletContext } from "react-router-dom";
import { Loading } from "./Loading"
import { Character } from "./Character";
import { AccountSlide } from "./AccountSlide";
import { Gemini } from "./Gemini";


export const Home = () => {
  const { user, viewState, setViewState } = useOutletContext();

  const DisplayHome = () => {
    switch (viewState) {
      case "home":
        return <AccountSlide />
      case "characters":
        return <Character />
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
