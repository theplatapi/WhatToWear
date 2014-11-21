Meteor.methods({
  getWeather: function(city) {
    var cached = Weather.findOne({city: city});

    if (!cached) {
      var forecasts = [];
      var forecast = HTTP.get('http://api.openweathermap.org/data/2.5/forecast?q=' + city + '&APPID='
      + Meteor.settings.owmKey).data;
      var length = forecast.list.length;

      for (var i = 1; i < length; i++) {
        var previous = forecast.list[i - 1];
        var current = forecast.list[i];
        var slope = (current.main.temp - previous.main.temp) / (current.dt - previous.dt);

        //index is up to that time, so dt[i-1] to dt[i]
        forecasts.push({
          date: current.dt,
          slope: slope,
          yIntercept: current.main.temp - slope * current.dt,
          //TODO: Fix this
          rain: current.rain ? current.rain["3h"] : 0
        });
      }
      Weather.upsert({city: city}, {$set: {downloaded: new Date(), forecasts: forecasts}});
    }
  }
});

//World Weather Online
var weather = {
  "data": {
    "current_condition": [
      {
        "cloudcover": "75",
        "FeelsLikeC": "19",
        "FeelsLikeF": "66",
        "humidity": "46",
        "observation_time": "01:07 AM",
        "precipMM": "0.0",
        "pressure": "1019",
        "temp_C": "19",
        "temp_F": "66",
        "visibility": "16",
        "weatherCode": "116",
        "weatherDesc": [
          {
            "value": "Partly Cloudy"
          }
        ],
        "weatherIconUrl": [
          {
            "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
          }
        ],
        "winddir16Point": "SSW",
        "winddirDegree": "200",
        "windspeedKmph": "11",
        "windspeedMiles": "7"
      }
    ],
    "request": [
      {
        "query": "93405",
        "type": "Zipcode"
      }
    ],
    "weather": [
      {
        "astronomy": [
          {
            "moonrise": "02:52 AM",
            "moonset": "02:44 PM",
            "sunrise": "06:41 AM",
            "sunset": "04:55 PM"
          }
        ],
        "date": "2014-11-18",
        "hourly": [
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "99",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "4",
            "DewPointC": "3",
            "DewPointF": "37",
            "FeelsLikeC": "12",
            "FeelsLikeF": "54",
            "HeatIndexC": "12",
            "HeatIndexF": "54",
            "humidity": "54",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "12",
            "tempF": "54",
            "time": "200",
            "visibility": "10",
            "weatherCode": "113",
            "weatherDesc": [
              {
                "value": "Clear"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png"
              }
            ],
            "WindChillC": "12",
            "WindChillF": "54",
            "winddir16Point": "SE",
            "winddirDegree": "133",
            "WindGustKmph": "9",
            "WindGustMiles": "6",
            "windspeedKmph": "4",
            "windspeedMiles": "3"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "100",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "8",
            "DewPointC": "1",
            "DewPointF": "34",
            "FeelsLikeC": "12",
            "FeelsLikeF": "54",
            "HeatIndexC": "13",
            "HeatIndexF": "55",
            "humidity": "46",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "13",
            "tempF": "55",
            "time": "500",
            "visibility": "10",
            "weatherCode": "113",
            "weatherDesc": [
              {
                "value": "Clear"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png"
              }
            ],
            "WindChillC": "12",
            "WindChillF": "54",
            "winddir16Point": "ESE",
            "winddirDegree": "116",
            "WindGustKmph": "17",
            "WindGustMiles": "11",
            "windspeedKmph": "8",
            "windspeedMiles": "5"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "100",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "15",
            "DewPointC": "1",
            "DewPointF": "34",
            "FeelsLikeC": "13",
            "FeelsLikeF": "56",
            "HeatIndexC": "13",
            "HeatIndexF": "56",
            "humidity": "44",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "13",
            "tempF": "56",
            "time": "800",
            "visibility": "10",
            "weatherCode": "113",
            "weatherDesc": [
              {
                "value": "Sunny"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
              }
            ],
            "WindChillC": "13",
            "WindChillF": "56",
            "winddir16Point": "ESE",
            "winddirDegree": "113",
            "WindGustKmph": "16",
            "WindGustMiles": "10",
            "windspeedKmph": "8",
            "windspeedMiles": "5"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "100",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "7",
            "DewPointC": "2",
            "DewPointF": "36",
            "FeelsLikeC": "21",
            "FeelsLikeF": "69",
            "HeatIndexC": "21",
            "HeatIndexF": "69",
            "humidity": "29",
            "precipMM": "0.0",
            "pressure": "1020",
            "tempC": "21",
            "tempF": "69",
            "time": "1100",
            "visibility": "10",
            "weatherCode": "113",
            "weatherDesc": [
              {
                "value": "Sunny"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
              }
            ],
            "WindChillC": "21",
            "WindChillF": "69",
            "winddir16Point": "SE",
            "winddirDegree": "135",
            "WindGustKmph": "11",
            "WindGustMiles": "7",
            "windspeedKmph": "9",
            "windspeedMiles": "6"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "10",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "97",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "12",
            "DewPointC": "4",
            "DewPointF": "39",
            "FeelsLikeC": "24",
            "FeelsLikeF": "75",
            "HeatIndexC": "24",
            "HeatIndexF": "75",
            "humidity": "28",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "23",
            "tempF": "74",
            "time": "1400",
            "visibility": "10",
            "weatherCode": "113",
            "weatherDesc": [
              {
                "value": "Sunny"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
              }
            ],
            "WindChillC": "23",
            "WindChillF": "74",
            "winddir16Point": "S",
            "winddirDegree": "187",
            "WindGustKmph": "18",
            "WindGustMiles": "11",
            "windspeedKmph": "16",
            "windspeedMiles": "10"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "99",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "6",
            "DewPointC": "7",
            "DewPointF": "44",
            "FeelsLikeC": "21",
            "FeelsLikeF": "70",
            "HeatIndexC": "24",
            "HeatIndexF": "75",
            "humidity": "40",
            "precipMM": "0.0",
            "pressure": "1018",
            "tempC": "21",
            "tempF": "70",
            "time": "1700",
            "visibility": "10",
            "weatherCode": "113",
            "weatherDesc": [
              {
                "value": "Clear"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png"
              }
            ],
            "WindChillC": "21",
            "WindChillF": "70",
            "winddir16Point": "SSW",
            "winddirDegree": "197",
            "WindGustKmph": "17",
            "WindGustMiles": "11",
            "windspeedKmph": "15",
            "windspeedMiles": "9"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "95",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "67",
            "DewPointC": "9",
            "DewPointF": "48",
            "FeelsLikeC": "17",
            "FeelsLikeF": "63",
            "HeatIndexC": "19",
            "HeatIndexF": "66",
            "humidity": "64",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "17",
            "tempF": "63",
            "time": "2000",
            "visibility": "10",
            "weatherCode": "119",
            "weatherDesc": [
              {
                "value": "Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
              }
            ],
            "WindChillC": "17",
            "WindChillF": "63",
            "winddir16Point": "S",
            "winddirDegree": "184",
            "WindGustKmph": "14",
            "WindGustMiles": "9",
            "windspeedKmph": "8",
            "windspeedMiles": "5"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "1",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "46",
            "DewPointC": "8",
            "DewPointF": "46",
            "FeelsLikeC": "13",
            "FeelsLikeF": "55",
            "HeatIndexC": "13",
            "HeatIndexF": "56",
            "humidity": "70",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "13",
            "tempF": "56",
            "time": "2300",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
              }
            ],
            "WindChillC": "13",
            "WindChillF": "55",
            "winddir16Point": "SSE",
            "winddirDegree": "156",
            "WindGustKmph": "20",
            "WindGustMiles": "12",
            "windspeedKmph": "9",
            "windspeedMiles": "6"
          }
        ],
        "maxtempC": "23",
        "maxtempF": "74",
        "mintempC": "11",
        "mintempF": "51"
      },
      {
        "astronomy": [
          {
            "moonrise": "03:49 AM",
            "moonset": "03:19 PM",
            "sunrise": "06:42 AM",
            "sunset": "04:54 PM"
          }
        ],
        "date": "2014-11-19",
        "hourly": [
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "89",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "32",
            "DewPointC": "8",
            "DewPointF": "46",
            "FeelsLikeC": "13",
            "FeelsLikeF": "56",
            "HeatIndexC": "14",
            "HeatIndexF": "57",
            "humidity": "65",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "14",
            "tempF": "57",
            "time": "200",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
              }
            ],
            "WindChillC": "13",
            "WindChillF": "56",
            "winddir16Point": "SE",
            "winddirDegree": "134",
            "WindGustKmph": "21",
            "WindGustMiles": "13",
            "windspeedKmph": "10",
            "windspeedMiles": "6"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "91",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "19",
            "DewPointC": "7",
            "DewPointF": "44",
            "FeelsLikeC": "14",
            "FeelsLikeF": "58",
            "HeatIndexC": "15",
            "HeatIndexF": "58",
            "humidity": "59",
            "precipMM": "0.0",
            "pressure": "1018",
            "tempC": "15",
            "tempF": "58",
            "time": "500",
            "visibility": "10",
            "weatherCode": "113",
            "weatherDesc": [
              {
                "value": "Clear"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0008_clear_sky_night.png"
              }
            ],
            "WindChillC": "14",
            "WindChillF": "58",
            "winddir16Point": "SSE",
            "winddirDegree": "165",
            "WindGustKmph": "19",
            "WindGustMiles": "12",
            "windspeedKmph": "10",
            "windspeedMiles": "6"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "100",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "45",
            "DewPointC": "7",
            "DewPointF": "44",
            "FeelsLikeC": "14",
            "FeelsLikeF": "56",
            "HeatIndexC": "14",
            "HeatIndexF": "58",
            "humidity": "61",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "14",
            "tempF": "58",
            "time": "800",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
              }
            ],
            "WindChillC": "14",
            "WindChillF": "56",
            "winddir16Point": "SSE",
            "winddirDegree": "160",
            "WindGustKmph": "21",
            "WindGustMiles": "13",
            "windspeedKmph": "10",
            "windspeedMiles": "6"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "100",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "53",
            "DewPointC": "5",
            "DewPointF": "42",
            "FeelsLikeC": "19",
            "FeelsLikeF": "66",
            "HeatIndexC": "19",
            "HeatIndexF": "66",
            "humidity": "41",
            "precipMM": "0.0",
            "pressure": "1020",
            "tempC": "19",
            "tempF": "66",
            "time": "1100",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
              }
            ],
            "WindChillC": "19",
            "WindChillF": "66",
            "winddir16Point": "S",
            "winddirDegree": "183",
            "WindGustKmph": "14",
            "WindGustMiles": "9",
            "windspeedKmph": "12",
            "windspeedMiles": "8"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "1",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "63",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "49",
            "DewPointC": "10",
            "DewPointF": "50",
            "FeelsLikeC": "21",
            "FeelsLikeF": "70",
            "HeatIndexC": "24",
            "HeatIndexF": "76",
            "humidity": "49",
            "precipMM": "0.0",
            "pressure": "1018",
            "tempC": "18",
            "tempF": "64",
            "time": "1400",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
              }
            ],
            "WindChillC": "21",
            "WindChillF": "70",
            "winddir16Point": "SW",
            "winddirDegree": "214",
            "WindGustKmph": "19",
            "WindGustMiles": "12",
            "windspeedKmph": "17",
            "windspeedMiles": "10"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "1",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "92",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "43",
            "DewPointC": "14",
            "DewPointF": "57",
            "FeelsLikeC": "19",
            "FeelsLikeF": "67",
            "HeatIndexC": "19",
            "HeatIndexF": "67",
            "humidity": "70",
            "precipMM": "0.0",
            "pressure": "1018",
            "tempC": "19",
            "tempF": "67",
            "time": "1700",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
              }
            ],
            "WindChillC": "19",
            "WindChillF": "67",
            "winddir16Point": "SW",
            "winddirDegree": "233",
            "WindGustKmph": "13",
            "WindGustMiles": "8",
            "windspeedKmph": "12",
            "windspeedMiles": "7"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "17",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "87",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "43",
            "DewPointC": "14",
            "DewPointF": "57",
            "FeelsLikeC": "15",
            "FeelsLikeF": "59",
            "HeatIndexC": "15",
            "HeatIndexF": "59",
            "humidity": "93",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "15",
            "tempF": "59",
            "time": "2000",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
              }
            ],
            "WindChillC": "15",
            "WindChillF": "59",
            "winddir16Point": "W",
            "winddirDegree": "259",
            "WindGustKmph": "3",
            "WindGustMiles": "2",
            "windspeedKmph": "2",
            "windspeedMiles": "1"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "5",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "7",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "44",
            "DewPointC": "12",
            "DewPointF": "54",
            "FeelsLikeC": "13",
            "FeelsLikeF": "56",
            "HeatIndexC": "13",
            "HeatIndexF": "56",
            "humidity": "94",
            "precipMM": "0.0",
            "pressure": "1020",
            "tempC": "13",
            "tempF": "56",
            "time": "2300",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
              }
            ],
            "WindChillC": "13",
            "WindChillF": "56",
            "winddir16Point": "NNW",
            "winddirDegree": "335",
            "WindGustKmph": "13",
            "WindGustMiles": "8",
            "windspeedKmph": "6",
            "windspeedMiles": "4"
          }
        ],
        "maxtempC": "18",
        "maxtempF": "64",
        "mintempC": "13",
        "mintempF": "55"
      },
      {
        "astronomy": [
          {
            "moonrise": "04:47 AM",
            "moonset": "03:57 PM",
            "sunrise": "06:43 AM",
            "sunset": "04:54 PM"
          }
        ],
        "date": "2014-11-20",
        "hourly": [
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "9",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "48",
            "DewPointC": "13",
            "DewPointF": "55",
            "FeelsLikeC": "14",
            "FeelsLikeF": "56",
            "HeatIndexC": "14",
            "HeatIndexF": "57",
            "humidity": "93",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "14",
            "tempF": "57",
            "time": "200",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
              }
            ],
            "WindChillC": "14",
            "WindChillF": "56",
            "winddir16Point": "NNW",
            "winddirDegree": "334",
            "WindGustKmph": "15",
            "WindGustMiles": "10",
            "windspeedKmph": "9",
            "windspeedMiles": "5"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "6",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "90",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "30",
            "DewPointC": "11",
            "DewPointF": "53",
            "FeelsLikeC": "12",
            "FeelsLikeF": "54",
            "HeatIndexC": "13",
            "HeatIndexF": "55",
            "humidity": "92",
            "precipMM": "0.0",
            "pressure": "1018",
            "tempC": "13",
            "tempF": "55",
            "time": "500",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
              }
            ],
            "WindChillC": "12",
            "WindChillF": "54",
            "winddir16Point": "NNW",
            "winddirDegree": "346",
            "WindGustKmph": "14",
            "WindGustMiles": "9",
            "windspeedKmph": "7",
            "windspeedMiles": "4"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "100",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "20",
            "DewPointC": "10",
            "DewPointF": "50",
            "FeelsLikeC": "10",
            "FeelsLikeF": "51",
            "HeatIndexC": "11",
            "HeatIndexF": "52",
            "humidity": "92",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "11",
            "tempF": "52",
            "time": "800",
            "visibility": "10",
            "weatherCode": "113",
            "weatherDesc": [
              {
                "value": "Sunny"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
              }
            ],
            "WindChillC": "10",
            "WindChillF": "51",
            "winddir16Point": "NW",
            "winddirDegree": "319",
            "WindGustKmph": "17",
            "WindGustMiles": "11",
            "windspeedKmph": "8",
            "windspeedMiles": "5"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "5",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "100",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "15",
            "DewPointC": "13",
            "DewPointF": "55",
            "FeelsLikeC": "17",
            "FeelsLikeF": "63",
            "HeatIndexC": "17",
            "HeatIndexF": "63",
            "humidity": "75",
            "precipMM": "0.0",
            "pressure": "1019",
            "tempC": "17",
            "tempF": "63",
            "time": "1100",
            "visibility": "10",
            "weatherCode": "113",
            "weatherDesc": [
              {
                "value": "Sunny"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
              }
            ],
            "WindChillC": "17",
            "WindChillF": "63",
            "winddir16Point": "WNW",
            "winddirDegree": "297",
            "WindGustKmph": "13",
            "WindGustMiles": "8",
            "windspeedKmph": "12",
            "windspeedMiles": "7"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "100",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "49",
            "DewPointC": "14",
            "DewPointF": "57",
            "FeelsLikeC": "20",
            "FeelsLikeF": "69",
            "HeatIndexC": "20",
            "HeatIndexF": "69",
            "humidity": "68",
            "precipMM": "0.0",
            "pressure": "1017",
            "tempC": "17",
            "tempF": "62",
            "time": "1400",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0002_sunny_intervals.png"
              }
            ],
            "WindChillC": "20",
            "WindChillF": "69",
            "winddir16Point": "WNW",
            "winddirDegree": "288",
            "WindGustKmph": "25",
            "WindGustMiles": "15",
            "windspeedKmph": "22",
            "windspeedMiles": "13"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "0",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "100",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "43",
            "DewPointC": "12",
            "DewPointF": "53",
            "FeelsLikeC": "18",
            "FeelsLikeF": "64",
            "HeatIndexC": "18",
            "HeatIndexF": "64",
            "humidity": "68",
            "precipMM": "0.0",
            "pressure": "1016",
            "tempC": "18",
            "tempF": "64",
            "time": "1700",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
              }
            ],
            "WindChillC": "18",
            "WindChillF": "64",
            "winddir16Point": "WNW",
            "winddirDegree": "292",
            "WindGustKmph": "18",
            "WindGustMiles": "11",
            "windspeedKmph": "16",
            "windspeedMiles": "10"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "45",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "70",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "38",
            "DewPointC": "11",
            "DewPointF": "51",
            "FeelsLikeC": "13",
            "FeelsLikeF": "56",
            "HeatIndexC": "14",
            "HeatIndexF": "57",
            "humidity": "81",
            "precipMM": "0.1",
            "pressure": "1016",
            "tempC": "14",
            "tempF": "57",
            "time": "2000",
            "visibility": "10",
            "weatherCode": "176",
            "weatherDesc": [
              {
                "value": "Patchy rain nearby"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0025_light_rain_showers_night.png"
              }
            ],
            "WindChillC": "13",
            "WindChillF": "56",
            "winddir16Point": "WNW",
            "winddirDegree": "289",
            "WindGustKmph": "14",
            "WindGustMiles": "9",
            "windspeedKmph": "10",
            "windspeedMiles": "6"
          },
          {
            "chanceoffog": "0",
            "chanceoffrost": "0",
            "chanceofhightemp": "0",
            "chanceofovercast": "0",
            "chanceofrain": "4",
            "chanceofremdry": "0",
            "chanceofsnow": "0",
            "chanceofsunshine": "46",
            "chanceofthunder": "0",
            "chanceofwindy": "0",
            "cloudcover": "50",
            "DewPointC": "11",
            "DewPointF": "52",
            "FeelsLikeC": "11",
            "FeelsLikeF": "53",
            "HeatIndexC": "12",
            "HeatIndexF": "54",
            "humidity": "92",
            "precipMM": "0.0",
            "pressure": "1017",
            "tempC": "12",
            "tempF": "54",
            "time": "2300",
            "visibility": "10",
            "weatherCode": "116",
            "weatherDesc": [
              {
                "value": "Partly Cloudy"
              }
            ],
            "weatherIconUrl": [
              {
                "value": "http://cdn.worldweatheronline.net/images/wsymbols01_png_64/wsymbol_0004_black_low_cloud.png"
              }
            ],
            "WindChillC": "11",
            "WindChillF": "53",
            "winddir16Point": "NW",
            "winddirDegree": "307",
            "WindGustKmph": "18",
            "WindGustMiles": "11",
            "windspeedKmph": "11",
            "windspeedMiles": "7"
          }
        ],
        "maxtempC": "17",
        "maxtempF": "62",
        "mintempC": "9",
        "mintempF": "48"
      }
    ]
  }
};

var owm = {
  "cod": "200",
  "message": 0.2713,
  "city": {
    "id": 1851632,
    "name": "Shuzenji",
    "coord": {"lon": 138.933334, "lat": 34.966671},
    "country": "JP",
    "population": 0
  },
  "cnt": 38,
  "list": [{
    "dt": 1416344400,
    "main": {
      "temp": 286.15,
      "temp_min": 273.214,
      "temp_max": 286.15,
      "pressure": 936.01,
      "sea_level": 1036.85,
      "grnd_level": 936.01,
      "humidity": 93,
      "temp_kf": 12.94
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    "clouds": {"all": 80},
    "wind": {"speed": 0.86, "deg": 335.009},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-18 21:00:00"
  }, {
    "dt": 1416355200,
    "main": {
      "temp": 287.02,
      "temp_min": 274.726,
      "temp_max": 287.02,
      "pressure": 937.32,
      "sea_level": 1037.83,
      "grnd_level": 937.32,
      "humidity": 81,
      "temp_kf": 12.29
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d"}],
    "clouds": {"all": 56},
    "wind": {"speed": 0.93, "deg": 334.505},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-19 00:00:00"
  }, {
    "dt": 1416366000,
    "main": {
      "temp": 291.91,
      "temp_min": 280.27,
      "temp_max": 291.91,
      "pressure": 936.55,
      "sea_level": 1036.23,
      "grnd_level": 936.55,
      "humidity": 62,
      "temp_kf": 11.64
    },
    "weather": [{"id": 801, "main": "Clouds", "description": "few clouds", "icon": "02d"}],
    "clouds": {"all": 20},
    "wind": {"speed": 0.14, "deg": 56.0008},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-19 03:00:00"
  }, {
    "dt": 1416376800,
    "main": {
      "temp": 292.05,
      "temp_min": 281.054,
      "temp_max": 292.05,
      "pressure": 936.71,
      "sea_level": 1035.91,
      "grnd_level": 936.71,
      "humidity": 59,
      "temp_kf": 11
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d"}],
    "clouds": {"all": 56},
    "wind": {"speed": 0.92, "deg": 189},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-19 06:00:00"
  }, {
    "dt": 1416387600,
    "main": {
      "temp": 287.06,
      "temp_min": 276.708,
      "temp_max": 287.06,
      "pressure": 938.25,
      "sea_level": 1038.01,
      "grnd_level": 938.25,
      "humidity": 80,
      "temp_kf": 10.35
    },
    "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n"}],
    "clouds": {"all": 36},
    "wind": {"speed": 0.92, "deg": 155.003},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-19 09:00:00"
  }, {
    "dt": 1416398400,
    "main": {
      "temp": 281.45,
      "temp_min": 271.751,
      "temp_max": 281.45,
      "pressure": 939.54,
      "sea_level": 1039.81,
      "grnd_level": 939.54,
      "humidity": 93,
      "temp_kf": 9.7
    },
    "weather": [{"id": 801, "main": "Clouds", "description": "few clouds", "icon": "02n"}],
    "clouds": {"all": 12},
    "wind": {"speed": 0.28, "deg": 196.503},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-19 12:00:00"
  }, {
    "dt": 1416409200,
    "main": {
      "temp": 282.21,
      "temp_min": 273.153,
      "temp_max": 282.21,
      "pressure": 939.95,
      "sea_level": 1040.63,
      "grnd_level": 939.95,
      "humidity": 93,
      "temp_kf": 9.06
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    "clouds": {"all": 80},
    "wind": {"speed": 0.72, "deg": 328.5},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-19 15:00:00"
  }, {
    "dt": 1416420000,
    "main": {
      "temp": 282.67,
      "temp_min": 274.258,
      "temp_max": 282.67,
      "pressure": 940.03,
      "sea_level": 1041.05,
      "grnd_level": 940.03,
      "humidity": 97,
      "temp_kf": 8.41
    },
    "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10n"}],
    "clouds": {"all": 80},
    "wind": {"speed": 0.76, "deg": 338.003},
    "rain": {"3h": 0.5},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-19 18:00:00"
  }, {
    "dt": 1416430800,
    "main": {
      "temp": 282.31,
      "temp_min": 274.55,
      "temp_max": 282.31,
      "pressure": 940.26,
      "sea_level": 1041.67,
      "grnd_level": 940.26,
      "humidity": 95,
      "temp_kf": 7.76
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    "clouds": {"all": 64},
    "wind": {"speed": 0.71, "deg": 324.501},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-19 21:00:00"
  }, {
    "dt": 1416441600,
    "main": {
      "temp": 284.02,
      "temp_min": 276.907,
      "temp_max": 284.02,
      "pressure": 941.31,
      "sea_level": 1042.53,
      "grnd_level": 941.31,
      "humidity": 88,
      "temp_kf": 7.11
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04d"}],
    "clouds": {"all": 76},
    "wind": {"speed": 0.57, "deg": 260.5},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-20 00:00:00"
  }, {
    "dt": 1416452400,
    "main": {
      "temp": 285.77,
      "temp_min": 279.298,
      "temp_max": 285.77,
      "pressure": 940.53,
      "sea_level": 1040.82,
      "grnd_level": 940.53,
      "humidity": 83,
      "temp_kf": 6.47
    },
    "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d"}],
    "clouds": {"all": 92},
    "wind": {"speed": 1.22, "deg": 180.501},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-20 03:00:00"
  }, {
    "dt": 1416463200,
    "main": {
      "temp": 284.47,
      "temp_min": 278.651,
      "temp_max": 284.47,
      "pressure": 940.09,
      "sea_level": 1040.22,
      "grnd_level": 940.09,
      "humidity": 93,
      "temp_kf": 5.82
    },
    "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
    "clouds": {"all": 92},
    "wind": {"speed": 0.76, "deg": 199.5},
    "rain": {"3h": 1},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-20 06:00:00"
  }, {
    "dt": 1416474000,
    "main": {
      "temp": 282.81,
      "temp_min": 277.632,
      "temp_max": 282.81,
      "pressure": 940.66,
      "sea_level": 1041.24,
      "grnd_level": 940.66,
      "humidity": 98,
      "temp_kf": 5.17
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    "clouds": {"all": 76},
    "wind": {"speed": 0.52, "deg": 194},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-20 09:00:00"
  }, {
    "dt": 1416484800,
    "main": {
      "temp": 280.39,
      "temp_min": 275.859,
      "temp_max": 280.39,
      "pressure": 941.56,
      "sea_level": 1042.11,
      "grnd_level": 941.56,
      "humidity": 100,
      "temp_kf": 4.53
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    "clouds": {"all": 56},
    "wind": {"speed": 0.73, "deg": 288.501},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-20 12:00:00"
  }, {
    "dt": 1416495600,
    "main": {
      "temp": 278.16,
      "temp_min": 274.275,
      "temp_max": 278.16,
      "pressure": 941.65,
      "sea_level": 1042.53,
      "grnd_level": 941.65,
      "humidity": 100,
      "temp_kf": 3.88
    },
    "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n"}],
    "clouds": {"all": 48},
    "wind": {"speed": 0.81, "deg": 326.002},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-20 15:00:00"
  }, {
    "dt": 1416506400,
    "main": {
      "temp": 276.46,
      "temp_min": 273.227,
      "temp_max": 276.46,
      "pressure": 941.56,
      "sea_level": 1042.58,
      "grnd_level": 941.56,
      "humidity": 98,
      "temp_kf": 3.23
    },
    "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n"}],
    "clouds": {"all": 44},
    "wind": {"speed": 0.83, "deg": 330.501},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-20 18:00:00"
  }, {
    "dt": 1416517200,
    "main": {
      "temp": 275.53,
      "temp_min": 272.945,
      "temp_max": 275.53,
      "pressure": 941.85,
      "sea_level": 1042.96,
      "grnd_level": 941.85,
      "humidity": 100,
      "temp_kf": 2.59
    },
    "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n"}],
    "clouds": {"all": 36},
    "wind": {"speed": 0.88, "deg": 327},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-20 21:00:00"
  }, {
    "dt": 1416528000,
    "main": {
      "temp": 278.4,
      "temp_min": 276.462,
      "temp_max": 278.4,
      "pressure": 942.78,
      "sea_level": 1043.61,
      "grnd_level": 942.78,
      "humidity": 91,
      "temp_kf": 1.94
    },
    "weather": [{"id": 800, "main": "Clear", "description": "sky is clear", "icon": "01d"}],
    "clouds": {"all": 0},
    "wind": {"speed": 0.93, "deg": 302.001},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-21 00:00:00"
  }, {
    "dt": 1416538800,
    "main": {
      "temp": 284.56,
      "temp_min": 283.271,
      "temp_max": 284.56,
      "pressure": 941.8,
      "sea_level": 1041.35,
      "grnd_level": 941.8,
      "humidity": 62,
      "temp_kf": 1.29
    },
    "weather": [{"id": 800, "main": "Clear", "description": "sky is clear", "icon": "01d"}],
    "clouds": {"all": 0},
    "wind": {"speed": 0.93, "deg": 192.5},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-21 03:00:00"
  }, {
    "dt": 1416549600,
    "main": {
      "temp": 284.35,
      "temp_min": 283.699,
      "temp_max": 284.35,
      "pressure": 941.1,
      "sea_level": 1040.05,
      "grnd_level": 941.1,
      "humidity": 53,
      "temp_kf": 0.65
    },
    "weather": [{"id": 800, "main": "Clear", "description": "sky is clear", "icon": "02d"}],
    "clouds": {"all": 8},
    "wind": {"speed": 0.87, "deg": 189.503},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-21 06:00:00"
  }, {
    "dt": 1416560400,
    "main": {
      "temp": 275.849,
      "temp_min": 275.849,
      "temp_max": 275.849,
      "pressure": 941.69,
      "sea_level": 1041.13,
      "grnd_level": 941.69,
      "humidity": 85
    },
    "weather": [{"id": 801, "main": "Clouds", "description": "few clouds", "icon": "02n"}],
    "clouds": {"all": 20},
    "wind": {"speed": 0.71, "deg": 197.002},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-21 09:00:00"
  }, {
    "dt": 1416571200,
    "main": {
      "temp": 271.575,
      "temp_min": 271.575,
      "temp_max": 271.575,
      "pressure": 942.44,
      "sea_level": 1042.03,
      "grnd_level": 942.44,
      "humidity": 86
    },
    "weather": [{"id": 802, "main": "Clouds", "description": "scattered clouds", "icon": "03n"}],
    "clouds": {"all": 36},
    "wind": {"speed": 0.62, "deg": 249.005},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-21 12:00:00"
  }, {
    "dt": 1416582000,
    "main": {
      "temp": 269.439,
      "temp_min": 269.439,
      "temp_max": 269.439,
      "pressure": 942.03,
      "sea_level": 1041.7,
      "grnd_level": 942.03,
      "humidity": 84
    },
    "weather": [{"id": 800, "main": "Clear", "description": "sky is clear", "icon": "01n"}],
    "clouds": {"all": 0},
    "wind": {"speed": 0.72, "deg": 278.008},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-21 15:00:00"
  }, {
    "dt": 1416592800,
    "main": {
      "temp": 269.559,
      "temp_min": 269.559,
      "temp_max": 269.559,
      "pressure": 941.4,
      "sea_level": 1041.03,
      "grnd_level": 941.4,
      "humidity": 80
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    "clouds": {"all": 56},
    "wind": {"speed": 0.82, "deg": 318.001},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-21 18:00:00"
  }, {
    "dt": 1416603600,
    "main": {
      "temp": 273.211,
      "temp_min": 273.211,
      "temp_max": 273.211,
      "pressure": 940.83,
      "sea_level": 1040.61,
      "grnd_level": 940.83,
      "humidity": 71
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    "clouds": {"all": 56},
    "wind": {"speed": 0.83, "deg": 327.502},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-21 21:00:00"
  }, {
    "dt": 1416614400,
    "main": {
      "temp": 280.528,
      "temp_min": 280.528,
      "temp_max": 280.528,
      "pressure": 941.69,
      "sea_level": 1041.37,
      "grnd_level": 941.69,
      "humidity": 48
    },
    "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d"}],
    "clouds": {"all": 92},
    "wind": {"speed": 0.65, "deg": 303.501},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-22 00:00:00"
  }, {
    "dt": 1416625200,
    "main": {
      "temp": 281.443,
      "temp_min": 281.443,
      "temp_max": 281.443,
      "pressure": 940.04,
      "sea_level": 1039.27,
      "grnd_level": 940.04,
      "humidity": 66
    },
    "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d"}],
    "clouds": {"all": 92},
    "wind": {"speed": 0.69, "deg": 263.001},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-22 03:00:00"
  }, {
    "dt": 1416636000,
    "main": {
      "temp": 281.554,
      "temp_min": 281.554,
      "temp_max": 281.554,
      "pressure": 939.06,
      "sea_level": 1037.75,
      "grnd_level": 939.06,
      "humidity": 83
    },
    "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10d"}],
    "clouds": {"all": 92},
    "wind": {"speed": 0.56, "deg": 340.002},
    "rain": {"3h": 1},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-22 06:00:00"
  }, {
    "dt": 1416646800,
    "main": {
      "temp": 279.692,
      "temp_min": 279.692,
      "temp_max": 279.692,
      "pressure": 938.38,
      "sea_level": 1037.25,
      "grnd_level": 938.38,
      "humidity": 89
    },
    "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    "clouds": {"all": 92},
    "wind": {"speed": 0.89, "deg": 0.00115967},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-22 09:00:00"
  }, {
    "dt": 1416657600,
    "main": {
      "temp": 279.41,
      "temp_min": 279.41,
      "temp_max": 279.41,
      "pressure": 938.2,
      "sea_level": 1037.27,
      "grnd_level": 938.2,
      "humidity": 88
    },
    "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10n"}],
    "clouds": {"all": 92},
    "wind": {"speed": 0.83, "deg": 339.501},
    "rain": {"3h": 1},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-22 12:00:00"
  }, {
    "dt": 1416668400,
    "main": {
      "temp": 277.892,
      "temp_min": 277.892,
      "temp_max": 277.892,
      "pressure": 936.89,
      "sea_level": 1036.13,
      "grnd_level": 936.89,
      "humidity": 94
    },
    "weather": [{"id": 500, "main": "Rain", "description": "light rain", "icon": "10n"}],
    "clouds": {"all": 88},
    "wind": {"speed": 0.94, "deg": 340},
    "rain": {"3h": 1},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-22 15:00:00"
  }, {
    "dt": 1416679200,
    "main": {
      "temp": 277.475,
      "temp_min": 277.475,
      "temp_max": 277.475,
      "pressure": 936.46,
      "sea_level": 1035.5,
      "grnd_level": 936.46,
      "humidity": 95
    },
    "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04n"}],
    "clouds": {"all": 92},
    "wind": {"speed": 0.79, "deg": 331},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-22 18:00:00"
  }, {
    "dt": 1416690000,
    "main": {
      "temp": 277.153,
      "temp_min": 277.153,
      "temp_max": 277.153,
      "pressure": 935.75,
      "sea_level": 1034.76,
      "grnd_level": 935.75,
      "humidity": 92
    },
    "weather": [{"id": 801, "main": "Clouds", "description": "few clouds", "icon": "02n"}],
    "clouds": {"all": 20},
    "wind": {"speed": 0.84, "deg": 334.001},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-22 21:00:00"
  }, {
    "dt": 1416700800,
    "main": {
      "temp": 279.158,
      "temp_min": 279.158,
      "temp_max": 279.158,
      "pressure": 937.5,
      "sea_level": 1036.65,
      "grnd_level": 937.5,
      "humidity": 81
    },
    "weather": [{"id": 804, "main": "Clouds", "description": "overcast clouds", "icon": "04d"}],
    "clouds": {"all": 92},
    "wind": {"speed": 0.8, "deg": 356.501},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-23 00:00:00"
  }, {
    "dt": 1416711600,
    "main": {
      "temp": 285.144,
      "temp_min": 285.144,
      "temp_max": 285.144,
      "pressure": 937.14,
      "sea_level": 1035.43,
      "grnd_level": 937.14,
      "humidity": 69
    },
    "weather": [{"id": 800, "main": "Clear", "description": "sky is clear", "icon": "02d"}],
    "clouds": {"all": 8},
    "wind": {"speed": 0.68, "deg": 23.0015},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-23 03:00:00"
  }, {
    "dt": 1416722400,
    "main": {
      "temp": 285.627,
      "temp_min": 285.627,
      "temp_max": 285.627,
      "pressure": 937.11,
      "sea_level": 1035.3,
      "grnd_level": 937.11,
      "humidity": 61
    },
    "weather": [{"id": 800, "main": "Clear", "description": "sky is clear", "icon": "02d"}],
    "clouds": {"all": 8},
    "wind": {"speed": 0.96, "deg": 86.5005},
    "rain": {"3h": 0},
    "sys": {"pod": "d"},
    "dt_txt": "2014-11-23 06:00:00"
  }, {
    "dt": 1416733200,
    "main": {
      "temp": 279.405,
      "temp_min": 279.405,
      "temp_max": 279.405,
      "pressure": 938.59,
      "sea_level": 1037.66,
      "grnd_level": 938.59,
      "humidity": 88
    },
    "weather": [{"id": 800, "main": "Clear", "description": "sky is clear", "icon": "01n"}],
    "clouds": {"all": 0},
    "wind": {"speed": 0.97, "deg": 105.502},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-23 09:00:00"
  }, {
    "dt": 1416744000,
    "main": {
      "temp": 275.242,
      "temp_min": 275.242,
      "temp_max": 275.242,
      "pressure": 941.26,
      "sea_level": 1040.96,
      "grnd_level": 941.26,
      "humidity": 93
    },
    "weather": [{"id": 803, "main": "Clouds", "description": "broken clouds", "icon": "04n"}],
    "clouds": {"all": 76},
    "wind": {"speed": 0.7, "deg": 0.00238037},
    "rain": {"3h": 0},
    "sys": {"pod": "n"},
    "dt_txt": "2014-11-23 12:00:00"
  }]
};