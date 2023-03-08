import { HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import img from "../../images/cover.jpg";

export function Home() {
  return (
    <>
      <div
        class="bg-cover bg-center h-screen"
        style={{ backgroundImage: `url(${img})` }}
      >
        <HomeIcon className="h-6 w-6 text-blue-500" />
        <h1 className="text-3xl font-bold text-center my-4 ">Fair Share!</h1>
        <div class="flex flex-col items-center justify-center h-full">
          <div class="flex justify-center">
            <Link to="/discover">
              <button className="btn-indigo mr-2">Save Food</button>
            </Link>
            <Link to="signup">
              <button className="btn-indigo mr-2">Sign up</button>
            </Link>
            <Link to="login">
              <button className="btn-indigo">Log in</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
