import { useState } from "react";
import useFetch from "../../controllers/api/api.js"
import Loader from "../loader/loader.js";


export default function Card(params) {

    // =========================== configuring variables and functions =====================

    const [preview, setPreview] = useState(false);
    let localTime = "";
    const iconUri = process.env.REACT_APP_ICON_URI;

    const { data, error, loading, time } = useFetch(params.id)

    function getTime() {
        const timeStamp = new Date(time * 1000);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const month = months[timeStamp.getMonth()];
        const date = timeStamp.getDate();
        const localTimeString = timeStamp.toLocaleTimeString()


        localTime = localTimeString + ' ' + date + ' ' + month;
    }

    getTime()

    function handleClick() {
        setPreview(true)
    }
    function closePreview() {
        setPreview(false)
    }



    // ============================== rendering results ===============================

    if (loading) {
        return (
            <Loader/>
        )
    } else if (error) {
        console.log("error : ", error)
    } else if (data) {

        // ====== get sunrise and sunset time from unix timeStamp =======
        const sunriseStamp = new Date((data.list[0].sys.sunrise) * 1000)
        const sunsetStap = new Date((data.list[0].sys.sunset) * 1000)

        let sunriseTime = sunriseStamp.toLocaleTimeString()
        let sunsetTime = sunsetStap.toLocaleTimeString()


        return (<>
            {
                // ============================ card preview =============================
                preview &&
                <div className="preview">
                    <img src="arrow.png" alt="close" className="close" onClick={closePreview} />
                    <div className="cardPreview" id={params.id}>
                        <div className="top-row-preview" >
                            <div className="left-col">
                                <span className="country">
                                    {data.list[0].name}, {data.list[0].sys.country}
                                </span>
                                <p>
                                    {localTime}
                                </p>
                            </div>
                        </div>

                        <div className="bottom-row-preview">

                            <div className="desc-preview">
                                <img src={iconUri + data.list[0].weather[0].icon + ".png"} alt="" />
                                <span className="desc" > {" " + data.list[0].weather[0].description} </span>
                            </div>

                            <div className="right-col-preview">
                                <span>
                                    <span className="temp">
                                        {data.list[0].main.temp}
                                        <sup>o</sup></span>
                                    <span className="temp"> C </span>
                                </span>
                                <br />
                                <br />
                                <span>
                                    min temp : <span> {" " + data.list[0].main.temp_min}
                                        <sup>o</sup></span>
                                    <span> C </span>
                                </span>
                                <br />
                                <span>
                                    max temp : <span> {" " + data.list[0].main.temp_max}
                                        <sup>o</sup></span>
                                    <span> C </span>
                                </span>
                            </div>
                        </div>


                        <div className="bottom-row">
                            <div className="bottom-row-left">
                                <p>
                                    pressure : {data.list[0].main.pressure}hPa<br />
                                    humidity : {data.list[0].main.humidity}%<br />
                                    visibility : {data.list[0].visibility / 1000}Km<br />
                                </p>
                            </div>

                            <div className="bottom-row-center">
                                <img src="wind_speed.png" alt="" />
                                <p> {data.list[0].wind.speed}m/s {data.list[0].wind.deg} degree </p>
                            </div>

                            <div className="bottom-row-right">
                                <p>
                                    sunrise : {sunriseTime}<br />
                                    sunset : {sunsetTime}<br />
                                </p>
                            </div>

                        </div>
                    </div>
                </div>
            }

            {/* ============================= card list ======================= */}

            <div className="card" id={params.id} onClick={handleClick}>
                <div className="top-row" >
                    <div className="left-col">
                        <span className="country">
                            {data.list[0].name}, {data.list[0].sys.country}
                        </span>
                        <p>
                            {localTime}
                        </p>
                        <div className="card-desc-container">
                            <img src={iconUri + data.list[0].weather[0].icon + ".png"} alt="" />
                            <span className="desc" > {" " + data.list[0].weather[0].description} </span>
                        </div>
                    </div>
                    <div className="right-col" >
                        <span>
                            <span className="temp">
                                {data.list[0].main.temp}
                                <sup>o</sup></span>
                            <span className="temp"> C </span>
                        </span>
                        <br />
                        <br />
                        <span>
                            min temp : <span> {" " + data.list[0].main.temp_min}
                                <sup>o</sup></span>
                            <span> C </span>
                        </span>

                        <span>
                            max temp : <span> {" " + data.list[0].main.temp_max}
                                <sup>o</sup></span>
                            <span> C </span>
                        </span>
                    </div>
                    <div>

                    </div>
                </div>

                <div className="bottom-row">
                    <div className="bottom-row-left">
                        <p>
                            pressure : {data.list[0].main.pressure}hPa<br />
                            humidity : {data.list[0].main.humidity}%<br />
                            visibility : {data.list[0].visibility / 1000}Km<br />
                        </p>
                    </div>

                    <div className="bottom-row-center">
                        <img src="wind_speed.png" alt="" />
                        <p> {data.list[0].wind.speed}m/s {data.list[0].wind.deg} degree </p>
                    </div>

                    <div className="bottom-row-right">
                        <p>
                            sunrise : {sunriseTime}<br />
                            sunset : {sunsetTime}<br />
                        </p>
                    </div>

                </div>
            </div>
        </>
        )
    }

}