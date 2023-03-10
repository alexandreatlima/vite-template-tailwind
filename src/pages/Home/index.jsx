import { HomeIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import img from "../../images/cover.jpg";

export function Home() {
  return (
    <>
      <div
        className="bg-cover bg-center h-screen pt-16"
        style={{
          backgroundImage: `url("https://res.cloudinary.com/dukhlscyh/image/upload/v1678394316/pictures/file_ba8fmm.png")`,
        }}
      >
        <div className="flex flex-col items-start justify-end h-96 pl-52">
          <div className="flex justify-start gap-4">
            <Link to="/discover">
              <button className="btn-indigo mr-2">Save Food</button>
            </Link>
            <Link to="/signup">
              <button className="btn-indigo mr-2">Sign up</button>
            </Link>
            <Link to="/login">
              <button className="btn-indigo">Log in</button>
            </Link>
          </div>
        </div>
        <footer className="flex flex-row items-start gap-4 pl-4 mt-8">
          <div className="font-semibold">
            <p>- Powered by: </p>
          </div>
          <div className="text-sm italic">
            <p>- React</p>
            <p>- Tailwind</p>
            <p>- Node</p>
            <p>- Express</p>
          </div>
        </footer>
      </div>
    </>
  );
}
