import { NavLink } from "react-router-dom";



import "./BlankPage.css";

function BlankPage() {

  return (

    <>


  <div className="blank">
          <h1>FEATURE / PAGE IN DEVELOPMENT</h1>
          <h3>Are you sure your&apos;e in the right place?</h3>
        <NavLink to="/" className="blank-button-text">
          <button
          className="blank-button"
          >
            Home
          </button>
        </NavLink>

  </div>


    </>



  );
}

export default BlankPage;
