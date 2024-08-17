import { useState } from "react"
import { Loading } from "./Loading"
import { AllCharactersSlide } from "./AllCharactersSlide";
import { AccountSlide } from "./AccountSlide";
import { Gemini } from "./Gemini";


export const Home = () => {

  const [viewState, setViewState ] = useState("gemini");

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
      <section className="bg-base-100 rounded-box p-10">
        <main className="bg-base-100 rounded">
          <DisplayHome viewState={viewState}/>
        </main>
      </section>
    </>
  );
}
