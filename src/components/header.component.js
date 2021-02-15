import React from "react";
// Font Awesome Icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faFish } from "@fortawesome/free-solid-svg-icons";
library.add(faFish);

function Header() {
  return (
    <nav className="navbar navbar-dark">
      <a className="navbar-brand" href="/">
      <h1>
      <FontAwesomeIcon icon="fish" /> Fishing Diary
      </h1>
      </a>
    </nav>
  );
}

export default Header;