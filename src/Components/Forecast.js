import { Container, Alert } from "react-bootstrap";
import "./Forecast.css";
import "../OwFont/css/owfont-regular.css";

var moment = require("moment");

const OneDay = (props) => {
  let newDate = new Date();
  const weekday = props.day.dt * 1000;
  newDate.setTime(weekday);

  const imgURL = `owf owf-${props.day.weather[0].id} owf-3x`;

  return (
    <Container className="p-0 d-flex flex-column justify-content-between align-items-center border oneDay">
      <div className="dayName">
        <strong>{moment(newDate).format("dddd")}</strong>
      </div>
      <div className="date text-secondary">
        {moment(newDate).format("MMMM Do")}
      </div>
      <div>
        <i className={imgURL}></i>
      </div>
      <div className="temp">{Math.round(props.day.temp.day) + "°C"}</div>
      <div className="description">{props.day.weather[0].description}</div>
    </Container>
  );
};

export const Forecast = (props) => {
  return (
    <Container className="p-0 my-1 d-flex flex-row justify-content-between overflow-auto allDay">
      {props.days.length === 0 ? null : props.days.length === 1 ? (
        <Alert className="m-0 w-100 text-center" variant="danger">
          <Alert.Heading>Oh ! No data from server!</Alert.Heading>
          <p>Please try it later ...</p>
        </Alert>
      ) : (
        props.days.map((day, id) => <OneDay key={id} day={day} />)
      )}
    </Container>
  );
};
