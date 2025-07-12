import { Link } from "react-router-dom";

const ErrorNotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-screen">
      <div className="text-center flex flex-col gap-4">
        <p>404. PAGE NOT FOUND</p>
        <Link to="/">Click here to go back to your baby.</Link>
      </div>
    </section>
  );
};

export default ErrorNotFound;
