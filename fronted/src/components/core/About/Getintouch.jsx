import { Link } from "react-router-dom";
import "./Getintouch.css"; 
import { FaAsterisk } from 'react-icons/fa';

export default function Getintouch() {
  return (
    <div className="Getintouchmain">
      <form action="">
        <h2>Get in Touch</h2>
        <p>We'd love to hear from you. Please fill out this form.</p>

        <div className="form-group">
          <label htmlFor="firstName" className="label">First Name <FaAsterisk className="required-icon" /></label>
          <input type="text" id="firstName" className="input" required />
        </div>

        <div className="form-group">
          <label htmlFor="lastName" className="label">Last Name <FaAsterisk className="required-icon" /></label>
          <input type="text" id="lastName" className="input" required />
        </div>

        <div className="form-group">
          <label htmlFor="email" className="label">Email Address <FaAsterisk className="required-icon" /></label>
          <input type="email" id="email" className="input" required />
        </div>

        <div className="form-group">
          <label htmlFor="phone" className="label">Phone Number <FaAsterisk className="required-icon" /></label>
          <div className="phone-input">
            <select className="input country-code" required>
              <option value="+1">+1 (USA)</option>
              <option value="+91">+91 (India)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (Australia)</option>
              {/* <!-- Add more country codes as needed --> */}
            </select>
            <input type="tel" id="phone" className="input phone-number" placeholder="Your number" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="message" className="label">Message <FaAsterisk className="required-icon" /></label>
          <textarea id="message" className="textarea" required></textarea>
        </div>

        <button type="submit">Send Message</button>
      </form>
    </div>
  );
}
