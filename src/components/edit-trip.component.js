import React, {Component} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";

export default class EditTrip extends Component{
    constructor(props){
        super(props);

        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeTime = this.onChangeTime.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.onChangeWeather = this.onChangeWeather.bind(this);
        this.onChangeFishCaught = this.onChangeFishCaught.bind(this);
        this.onChangeGeneralNotes = this.onChangeGeneralNotes.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            date: new Date(),
            time: "",
            location: "",
            weather: "",
            fishcaught: "",
            generalNotes: ""
        }

    }

    componentDidMount(){
        axios.get("http://localhost:8080/trips/"+this.props.match.params.id)
            .then(response => {
                this.setState({
                    date: new Date(response.data.date),
                    time: response.data.time,
                    location: response.data.location,
                    weather: response.data.weather,
                    fishCaught: response.data.fishCaught,
                    generalNotes: response.data.generalNotes
                })
            })
            .catch(function(error){
                console.log(error);
            })

        // axios.get("http://localhost:8080/users/")
        //     .then(response =>{
        //         if(response.data.length > 0){
        //             this.setState({
        //                 users: response.data.map(user => user.username),
        //             })
        //         }
        //     })
    }

    onChangeDate(date){
        this.setState({
            date: date
        })
    }

    onChangeTime(time){
        this.setState({
            time: time
        })
    }

    onChangeLocation(e){
        this.setState({
            location: e.target.value
        })
    }

    onChangeWeather(e){
        this.setState({
            weather: e.target.value
        })
    }

    onChangeFishCaught(e){
        this.setState({
            fishCaught: e.target.value
        })
    }

    onChangeGeneralNotes(e){
        this.setState({
            generalNotes: e.target.value
        })
    }


    onSubmit(e){
        e.preventDefault();

        const trip = {
            date: this.state.date,
            time: this.state.time,
            location: this.state.location,
            weather: this.state.weather,
            fishCaught: this.state.fishCaught,
            generalNotes: this.state.generalNotes,
        }

        axios.post("http://localhost:8080/trips/update/"+this.props.match.params.id, trip)
            .then(res => console.log(res.data));

        console.log(trip);

        window.location = "/";
    }

    render(){
        return(
            <div>
                <h3>Edit Fishing Trip</h3>
                <form onSubmit={this.onSubmit}>
                <div className="form-group">
                        <label>Date: </label>
                        <div>
                            <DatePicker
                                selected={this.state.date}
                                onChange={this.onChangeDate}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Time: </label>
                        <div>
                            <TimePicker
                                selected={this.state.time}
                                onChange={this.onChangeTime}
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label>Location: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.location}
                            onChange={this.onChangeLocation}
                            />
                    </div>
                    <div className="form-group">
                        <label>Weather: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.weather}
                            onChange={this.onChangeWeather}
                            />
                    </div>
                    <div className="form-group">
                        <label>Fish Caught: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.fishCaught}
                            onChange={this.onChangeFishCaught}
                            />
                    </div>
                    <div className="form-group">
                        <label>Notes: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.generalNotes}
                            onChange={this.onChangeGeneralNotes}
                            />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Edit Fishing Trip" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}