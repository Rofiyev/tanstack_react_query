import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container-fluid d-flex justify-content-between flex-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link
          to={"/"}
          style={{
            color: "inherit",
            display: "flex",
            gap: "68x",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            width={"50px"}
            height={"50px"}
            style={{ objectFit: "cover" }}
            src={
              "data:image/png;base64,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"
            }
            alt="Logo"
          />
        </Link>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link
          to={"/"}
          style={{ textDecoration: "none" }}
          className="p-2 text-dark fw-semibold"
        >
          Home
        </Link>
        <Link
          to={"/create"}
          style={{ textDecoration: "none" }}
          className="p-2 text-dark fw-semibold"
        >
          Create
        </Link>
      </nav>
    </div>
  );
}
