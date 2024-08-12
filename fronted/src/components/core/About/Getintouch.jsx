import { Link } from "react-router-dom";
import "./Getintouch.css"; 
import { FaAsterisk } from 'react-icons/fa';
import ContatctUs from "../../Contact/ContatctUs";

export default function Getintouch() {
  return (
 <div>
      <h1>Get in Touch</h1>
      <p>We'd love to here for you, Please fill out this form. </p>
      <div>
        <ContatctUs/>

      </div>
 </div>
  );
}
