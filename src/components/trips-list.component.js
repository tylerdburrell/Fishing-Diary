import React, {Component} from "react";
import {Link} from "react-router-dom";
import axios from "axios";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Fab from "@material-ui/core/Fab";

const Trip = props => (
    <div className="trip">
      <h1>{props.trip.date.substring(0,10)}</h1>
      <p>{props.trip.time}</p>
      <p>{props.trip.location}</p>
      <p>{props.trip.weather}</p>
      <p>{props.trip.fishCaught}</p>
      <p>{props.trip.generalNotes}</p>
      <Link to={"/edit/"+props.trip._id}>
        <EditIcon />
      </Link>
      <button onClick={() => props.deleteTrip(props.trip._id)}>
        <DeleteIcon />
      </button>
    </div>
)

export default class TripsList extends Component{
    constructor(props){
        super(props);

        this.deleteTrip = this.deleteTrip.bind(this);

        this.state = {trips: []};
    }

componentDidMount(){
    axios.get("http://localhost:8080/trips/")
        .then(response => {
            this.setState({trips: response.data})
        })
        .catch((error) => {
            console.log(error);
        })
}

deleteTrip(id) {
    if(window.confirm("Are you sure you want to Delete this trip")){
        axios.delete("http://localhost:8080/trips/" + id)
        .then(res => console.log(res.data));
    this.setState({
        trips: this.state.trips.filter(el => el._id !== id)
    })
    }
}

tripList(){
    return this.state.trips.map(currenttrip => {
        return <Trip trip={currenttrip} deleteTrip={this.deleteTrip} key={currenttrip._id} />
    })
}
    
    render(){
        return(
            <div>
                <h3>Fishing Trips</h3>
                <div>
                    {this.tripList()}
                    <div className="addTrip">
                    <Link to={"/create"}>
                    <Fab>
                        <AddIcon />
                    </Fab>
                    </Link>
                    </div>
                </div>
                
            </div>
        )
    }
}