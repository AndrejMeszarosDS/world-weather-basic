import React, { useEffect, useRef, useState } from "react";
import { Forecast } from "./Forecast";

export const Map = ({ options }) => {
  const props = { ref: useRef() };
  const [days, setDays] = useState([]);

  const mapClicked = (latlng) => {
    const weatherURL =
      `http://api.openweathermap.org/data/2.5/onecall?lat=` +
      latlng.lat +
      `&lon=` +
      latlng.lng +
      `&units=metric&exclude=hourly,minutely&APPID=cf7a6ba227a103b2940c841aa405a5c6`;
    fetch(weatherURL)
      .then((res) => res.json())
      .then((data) => {
        setDays(data.daily);
      })
      .catch((error) => setDays(["error"]));
  };

  const onLoad = () => {
    const map = new window.google.maps.Map(props.ref.current, options);
    const marker = new window.google.maps.Marker({
      position: Map.defaultProps.options.center,
      map: map,
      title: "Current place",
    });
    map.addListener("click", function (event) {
      marker.setPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      map.panTo({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      mapClicked({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    });
    mapClicked(Map.defaultProps.options.center);
  };

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement(`script`);
      script.type = `text/javascript`;
      script.src =
        `https://maps.google.com/maps/api/js?key=` +
        process.env.REACT_APP_API_KEY;
      const headScript = document.getElementsByTagName(`script`)[0];
      headScript.parentNode.insertBefore(script, headScript);
      script.addEventListener(`load`, onLoad);
    }
  });

  return (
    <>
      <div {...props} style={{ width: "100%", height: "100%" }} />
      <Forecast days={days} />
    </>
  );
};

Map.defaultProps = {
  options: {
    center: { lat: 47.9884, lng: 17.6191 },
    zoom: 5,
  },
};
