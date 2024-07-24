import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/admin");
    }
  }, []);

  function authFormHandler(e) {
    e.preventDefault();
    const form = document.getElementById("authForm");
    if (form.name.value === "admin" && form.password.value === "admin") {
      localStorage.setItem("user", true);
      navigate("/admin");
    }
    form.reset();
  }

  return (
    <section className="auth w-screen flex justify-center items-center">
      <div className="w-2/5 h-2/5 bg-white rounded-lg shadow-lg flex justify-center items-center">
        <form
          id="authForm"
          className="auth-form w-11/12 h-4/5 flex flex-col gap-2 justify-center"
          onSubmit={authFormHandler}
        >
          <div className="name flex flex-col gap-1">
            <label htmlFor="name" className="font-semibold">
              Name
            </label>
            <input
              type="text"
              placeholder="Name"
              name="name"
              id="name"
              className="w-full h-12 rounded-sm border-2 border-gray-200 px-2"
              required
            />
          </div>
          <div className="password flex flex-col gap-1">
            <label htmlFor="password" className="font-semibold">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              name="password"
              id="password"
              className="w-full h-12 rounded-sm border-2 border-gray-200 px-2"
              required
            />
          </div>
          <button className="w-full h-12 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-sm">
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}

export default Auth;
