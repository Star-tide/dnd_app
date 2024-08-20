import { useOutletContext } from "react-router-dom"

export const AccountSlide = () => {

    const { user } = useOutletContext();
  return (
    <>
    <h2>Account slide</h2>
    </>
  );
}