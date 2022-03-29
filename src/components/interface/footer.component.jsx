import React from "react";
import { Link } from "react-router-dom";
import Present from "./present.compontent";
import PrivacyPolicy from "./privacypolicy.component";
import TermsOfService from "./termsofservice.component";

const Footer = () => {
  return (
    <footer>
      <div>
        <div>
          <Link to="/">2021 © Copyright MaverickCER. All Rights Reserved</Link>
        </div>
        <nav>
          <ul>
            <li>
              <Present label="Privacy Policy" title="Privacy Policy">
                <PrivacyPolicy />
              </Present>
            </li>
            <li>
              <Present label="Terms of Service" title="Terms of Service">
                <TermsOfService />
              </Present>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
