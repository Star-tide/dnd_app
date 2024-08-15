import { useOutletContext } from "react-router-dom";
import axios from"axios"


export const LogIn = ({ setAccountState }) => {

  const { setUserAuth } = useOutletContext();
  const handleSignUpClick = () => {
    setAccountState(true); // Switch to the SignUp component
  };

  const loginSubmit = async (event) => {
    event.preventDefault();
    setAccountState(null)
    const formData = new FormData(event.target)
    // Visualize what data is being sent
    // for (const [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }

    try {
        const { data } = await axios.post('http://127.0.0.1:8000/login/', formData, {
            headers: {
                'Content-type': 'application/json'
            }
        }) 
        localStorage.setItem('token', data['token'])
        setAccountState(true)
        setUserAuth(true)
    } catch (error) {
        console.log("Error Logging in:", error)
    }
  }

  return (
    <>
      <main className="card bg-base-100 w-96 shadow-xl">
        <section className="card-body items-center text-center">
          <h2 className="card-title">Welcome Adventurer</h2>
          <div className="divider"></div>
          <form action="post" onSubmit={loginSubmit}className="flex flex-col gap-2">
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
              </svg>
              <input
                name="email"
                type="text"
                className="grow"
                placeholder="Username/Email"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 16 16"
                fill="currentColor"
                className="h-4 w-4 opacity-70"
              >
                <path
                  fillRule="evenodd"
                  d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                  clipRule="evenodd"
                />
              </svg>
              <input name="password" type="password" className="grow" placeholder="Password" />
            </label>
            <div className="flex justify-center gap-1">
              <button
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
                type="submit"
              >
                <i className="fa-solid fa-right-to-bracket"></i>
                Log In
              </button>
              <button
                onClick={handleSignUpClick}
                className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
              >
                <i className="fa-solid fa-arrow-right"></i>
                Sign Up
              </button>
            </div>
          </form>
          <div className="divider"></div>
          {/* Open the modal using document.getElementById('ID').showModal() method */}
          <button
            className="btn btn-xs sm:btn-sm md:btn-md lg:btn-lg"
            onClick={() => document.getElementById("my_modal_1").showModal()}
          >
            Forgot Password
          </button>
          <dialog id="my_modal_1" className="modal">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Password Reset</h3>
              <form action="post">
                <label className="input input-bordered flex items-center gap-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                  >
                    <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                    <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                  </svg>
                  <input type="text" className="grow" placeholder="Email" />
                </label>
              </form>
              <p className="py-4">
                Check your email, you will receive reset instructions shortly
              </p>
              <div className="modal-action">
                <form method="dialog">
                  {/* if there is a button in form, it will close the modal */}
                  <button className="btn">
                    <i className="fa-solid fa-x"></i>
                  </button>
                </form>
              </div>
            </div>
          </dialog>
        </section>
      </main>
    </>
  );
};