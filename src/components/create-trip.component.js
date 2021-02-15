import React, {Component, useState} from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";


export default class CreateTrip extends Component{
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

    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const [successMsg, setSuccessMsg] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        previewFile(file);
        setSelectedFile(file);
        setFileInputState(e.target.value);
    };

    const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };

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
            generalNotes: this.state.generalNotes
        }

        axios.post("http://localhost:8080/trips/add", trip)
        .then(res => console.log(res.data));

        console.log(trip);

        window.location = "/";
    }

    render(){
        return(
            <div>
                <h3>Create New Fishing Trip</h3>
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
                        <label>Images: </label>
                        <input
                        id="fileInput"
                        type="file"
                        name="image"
                        onChange={handleFileInputChange}
                        value={fileInputState}
                        className="form-input"
                        />
                    </div>

                    <div className="form-group">
                        <label>Image: </label>
                        <div>
                            <ImageUploader
                                withIcon={true}
                                buttonText='Choose images'
                                onChange={this.onChangeImageURL}
                                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                maxFileSize={5242880}
                            />
                        </div>
                    </div>

                    

                    <div className="form-group">
                        <input type="submit" value="Create Fishing Trip" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}