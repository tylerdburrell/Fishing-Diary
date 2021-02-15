import React from "react";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";

function Footer() {
  const year = new Date().getFullYear();
  return (
    <div>
      <div className="phantom" />
      <footer>
        <a className="social-icon" href="https://github.com/tylerdburrell">
          <GitHubIcon style={{ fontSize: 30 }} />
        </a>
        <a
          className="social-icon"
          href="https://www.linkedin.com/in/tyler-burrell-0b3b67115/"
        >
          <LinkedInIcon style={{ fontSize: 30 }} />
        </a>
        <p>Tyler Burrell Copyright ⓒ {year}</p>
      </footer>
    </div>
  );
}

export default Footer;