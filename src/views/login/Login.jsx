import Navbar from "../../Components/Navbar";
import Title from "../../Components/Title";

function Login() {
  return (
    <div className=" min-h-screen">
      <div className=" fixed left-0 right-0 top-0 bg-white z-20 shadow">
        <Navbar />
      </div>
      <div className="pt-16">
        <Title title={"Sign In"} />
        <form action="" className=" w-1/3 mx-auto grid grid-cols-1 gap-5">
          <input
            type="text"
            placeholder="Enter Email"
            className="border-b py-2 outline-none"
          />
          <input
            type="text"
            placeholder="Enter Password"
            className="border-b py-2 outline-none"
          />
          <input
            type="submit"
            value={"Sign In"}
            className="bg-slate-700 text-white py-3"
          />
        </form>
        <hr className="my-20" />
        <div>
          <p className="text-center">
            Already have an account?
            <span className="underline">Register</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
