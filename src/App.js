import React from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/header.component";
import Footer from "./components/footer.component";
import TripsList from "./components/trips-list.component";
import EditTrip from "./components/edit-trip.component";
import CreateTrip from "./components/create-trip.component";

function App() {
  return (
    <Router>
      <div>
        <Header />
        <br/>
        <Route path="/" exact component={TripsList} />
        <Route path="/edit/:id" component={EditTrip} />
        <Route path="/create" component={CreateTrip} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;