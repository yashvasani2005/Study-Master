import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using react-router for navigation
import './Error.css'

function Error() {
  return (
    <div className="error-container">
      <h2>Error - 404 Not Found</h2>
      <p>Sorry, the page you are looking for does not exist.</p>
      <Link to="/" className="home-link">Go Back to Home</Link>
    </div>
  );
}

export default Error;
