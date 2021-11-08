import { useState,useEffect } from "react"
import dayjs from "dayjs"

const Weather = ({city_name}) => {
    const [Weatherdata,setWeatherdata] = useState([])
    const [Loading,setLoading] = useState(true)

    const getApi = async () => {
        const res = await fetch(`${process.env.REACT_APP_OW_API_URL}/weather?q=${city_name}&appid=${process.env.REACT_APP_OW_API_KEY}&units=metric`);
        const json = await res.json();
        setWeatherdata(json)
        setLoading(false);
    }

    useEffect(() => {
        getApi();
    },[]);

    //Loading中は、こちらが表示され、Loadingがfalseになるとstateが変わって
    //再レンダリングされて、下のreturnが走る
    if (Loading) {
        return <div>loading</div>;
    }

    return (
        <div className="w-96 h-56 m-4 p-6  bg-blue-500 
                        rounded-xl shadow-2xl
                        text-white text-bold
                        transform hover:scale-110 transition-transform">
            <div className="flex justify-between">
                <div>
                    City : {Weatherdata.name}
                </div>
                <div>
                    Data : { dayjs(Weatherdata.ts).format('YYYY-MM-DD')}
                </div>

            </div>
            <div　className="flex justify-between">
                <div>
                    <div className="text-5xl my-4">
                        {Weatherdata.main.temp}℃
                    </div>
                    <div>
                        Humidity : {Weatherdata.main.humidity}%
                    </div>
                </div>
                <div className="my-4">
                    <img src={`${process.env.REACT_APP_OW_ICON_URL}/${Weatherdata.weather[0].icon}.png`} 
                         alt={Weatherdata.weather[0].description} />
                    <div>{Weatherdata.weather[0].main}</div>
                </div>
            </div>
        </div>
    )   
}

export default Weather;
