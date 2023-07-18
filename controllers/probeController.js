const request = require("request");
const axios = require("axios");

const Ranges = {
  particules1: {
    "0 - 50": [0, 12.0],
    "51 - 100": [12.1, 35.4],
    "101 - 150": [35.5, 55.4],
    "151 - 200": [55.5, 150.4],
    "200 - 300 ": [150.5, 250.4],
    "301 - 500": [250.5, 500.4]
  },
  particules2: {
    "0 - 50": [0.0, 54.0],
    "51 - 100": [55.0, 154.0],
    "101 - 150": [155.0, 254.0],
    "151 - 200": [255.0, 354.0],
    "200 - 300": [355.0, 424.0],
    "301 - 500": [424.0, 604.0]
  },
  reduced: {
    //Nitrogen Monoxide
    "0 - 50": [0.0, 54.0],
    "51 - 100": [55.0, 100.0],
    "101 - 150": [101.0, 360.0],
    "151 - 200": [361.0, 649.0],
    "200 - 300": [650.0, 1249.0],
    "301 - 500": [1250.0, 2049.0]
  },
  oxidised: {
    //Carbon Monoxide
    "0 - 50": [0, 4.4],
    "51 - 100": [4.5, 9.4],
    "101 - 150": [9.5, 12.4],
    "151 - 200": [12.5, 15.4],
    "200 - 300": [15.5, 30.4],
    "301 - 500": [30.5, 50.4]
  }
};

const messages = [
  "low" = [
    "La qualité de l'air intérieur est dangereuse. Il est recommandé d'ouvrir les fenêtres, de vérifier les sources potentielles de pollution et de contacter un professionnel si nécessaire.",
    "L'indice de qualité de l'air est très élevé à l'intérieur. Évitez l'exposition prolongée et assurez-vous d'aérer votre espace pour réduire les niveaux de pollution.",
    "L'air à l'intérieur est fortement pollué et peut avoir un impact négatif sur la santé. Essayez de trouver la source de pollution et de la résoudre dès que possible."
  ],
  "medium" = [
    "La qualité de l'air intérieur est moyenne. Pensez à ouvrir les fenêtres régulièrement pour favoriser une meilleure circulation de l'air.",
    "L'indice de qualité de l'air indique un niveau modéré. Assurez-vous de nettoyer régulièrement les filtres de vos systèmes de ventilation pour améliorer la qualité de l'air.",
    "L'air intérieur contient quelques particules. Évitez l'utilisation excessive de produits chimiques et maintenez une ventilation adéquate pour un environnement plus sain."
  ],
  "good" = [
    "La qualité de l'air intérieur est bonne. Vous pouvez profiter d'un environnement sain et respirer facilement !",
    "L'air à l'intérieur est frais et propre. Continuez à maintenir de bonnes pratiques d'aération pour une atmosphère agréable.",
    "Votre espace est bien ventilé et l'air est de bonne qualité. Profitez de votre journée avec une respiration aisée !"
  ],
]

// Generate random float values between 0 and 100
function getRandomFloat(min, max) {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

// Generate dummy data for the object
function buildDummyDatas() {
  const dummyData = [];
  for (let i = 0; i < 10; i++) {
    const date = new Date();
    date.setMinutes(date.getMinutes() - i);
    const obj = {
      temperature: getRandomFloat(0, 45),
      pressure: getRandomFloat(0, 90),
      humidity: getRandomFloat(0, 90),
      light: getRandomFloat(0, 90),
      reduced: getRandomFloat(0, 9),
      oxidised: getRandomFloat(36, 70),
      ammoniac: getRandomFloat(0, 10),
      particules0: getRandomFloat(0, 95),
      particules1: getRandomFloat(36, 45),
      particules2: getRandomFloat(55, 150),
      date: date.toISOString()
    };
    dummyData.push(obj);
  }
  return dummyData;
}

function timestampToStr(dateInSeconds) {
  const date = new Date(dateInSeconds * 1000);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Les mois sont indexés à partir de 0
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

function cloneEntry(entry) {
  return [...entry];
}

function convertDate(entry) {
  entry[1].date = timestampToStr(entry[1].date);
  return entry;
}

function groupByDate(groups, entry) {
  const date = entry[1].date.split(" ")[0];
  if (!groups[date]) {
    groups[date] = [];
  }
  groups[date].push(entry);
  return groups;
}

function groupByHour(groups, entry) {
  const date = entry[1].date.split(":")[0];
  if (!groups[date]) {
    groups[date] = [];
  }
  groups[date].push(entry);
  return groups;
}

function displayEntriesByDate(groupedByDate) {
  for (let date in groupedByDate) {
    console.log(`${date}: ${groupedByDate[date].length} entrée(s)`);
  }
}

function displayEntriesByHour(groupedByHour) {
  for (let hour in groupedByHour) {
    console.log(`${hour}h: ${groupedByHour[hour].length} entrée(s)`);
  }
}

function extractValues(groupedByHour, pollutant) {
  return groupedByHour.map(entry => parseFloat(entry[1][pollutant]));
}

function calculateAverage(values) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function groupDataByDate(hourlyAqi) {
  const groupedData = {};

  // Split the data into days
  for (const data of hourlyAqi) {
    const [date] = data.date.split(" ");

    if (!groupedData[date]) {
      groupedData[date] = [];
    }

    groupedData[date].push(data);
  }

  return groupedData;
}

function calculateAverageAqi(groupedData) {
  const averageAqiData = {};
  for (const date in groupedData) {
    const dateData = groupedData[date];
    let totalAqi = 0;
    let count = 0;

    for (const data of dateData) {
      totalAqi += parseFloat(data.aqi);
      count += 1;
    }

    // Calculate the average, convert it to a string with 2 decimal places,
    // and then convert it back to a float
    averageAqiData[date] = parseFloat((totalAqi / count).toFixed(2));
  }
  return averageAqiData;
}

function calculatePercentageInRange(value, min, max) {
  return (Number(value) - Number(min)) / (Number(max) - Number(min)) * 100;
}

function getRanges(concentration, ranges) {
  const rangeData = Object.entries(ranges)
    .map(([key, value]) => {
      const [Ilow, Ihigh] = key.split(" - ").map(Number);
      const [Clow, Chigh] = value;
      return { Ilow, Ihigh, Clow, Chigh };
    })
    .sort((a, b) => a.Clow - b.Clow);

  for (let i = 0; i < rangeData.length; i++) {
    const { Ilow, Ihigh, Clow, Chigh } = rangeData[i];

    if (Clow <= concentration && concentration <= Chigh) {
      return { Ilow, Ihigh, Clow, Chigh };
    }
  }
}

function calculateAqi(pollutant, concentration) {
  concentration = Math.floor(concentration);
  const pollutants = {
    particules1: {
      ranges: Ranges[pollutant]
    },
    particules2: {
      ranges: Ranges[pollutant]
    },
    reduced: {
      ranges: Ranges[pollutant]
    },
    oxidised: {
      ranges: Ranges[pollutant]
    }
  };

  const pollutantData = pollutants[pollutant];
  if (pollutantData) {
    const range = getRanges(concentration, pollutantData.ranges);
    let { Clow, Chigh, Ilow, Ihigh } = range;
    const aqi = aqiFormula(concentration, Ilow, Ihigh, Clow, Chigh);
    return [Ilow, Ihigh, Clow, Chigh, aqi];
  } else {
    return -1;
  }
}

function calculateAqiOfHour(groupedByHour) {
  const pollutants = {
    particules1: {
      ranges: Ranges["particules1"]
    },
    particules2: {
      ranges: Ranges["particules2"]
    },
    reduced: {
      ranges: Ranges["reduced"]
    },
    oxidised: {
      ranges: Ranges["oxidised"]
    }
  };
  let aqis = [];
  for (let pollutant in pollutants) {
    const pollutantData = pollutants[pollutant];
    const range = getRanges(
      calculateAverage(extractValues(groupedByHour, pollutant)),
      pollutantData.ranges
    );
    let { Ilow, Ihigh, Clow, Chigh } = range;
    const aqi = aqiFormula(
      calculateAverage(extractValues(groupedByHour, pollutant)),
      Ilow,
      Ihigh,
      Clow,
      Chigh
    );
    aqis.push(
      parseFloat(calculatePercentageInRange(aqi, Ilow, Ihigh)).toFixed(2)
    );
  }
  return aqis;
}

exports.dataConsolidation = (req, res) => {
  const now = new Date();
  let hourlyAqi = [];
  this.getStreamData(req.body.address).then(stream => {
    if (stream) {
      stream = stream.map(cloneEntry).map(convertDate);
      let groupedByDate = stream.reduce(groupByDate, {});
      let groupedByHour = stream.reduce(groupByHour, {});
      for (let hour in groupedByHour) {
        hourlyAqi.push({
          date: hour,
          aqi: parseFloat(calculateAqiOfHour(groupedByHour[hour])).toFixed(2)
        });
      }
      console.log(hourlyAqi, calculateAverageAqi(groupDataByDate(hourlyAqi)));
      res.json([
        calculateAverageAqi(groupDataByDate(hourlyAqi)),
        stream[stream.length - 1]
      ]);
    }
  });
};

function aqiFormula(concentration, Ilow, Ihigh, Clow, Chigh) {
  return (Ihigh - Ilow) / (Chigh - Clow) * (concentration - Clow) + Ilow;
}

exports.getStreamData = async url => {
  try {
    const response = await axios.get(`http://${url}/datas`);
    if (response) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

exports.startStream = res => {
  request.get(
    {
      url: "http://192.168.1.83:5000/datas/create",
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};

exports.stopStream = res => {
  request.get(
    {
      url: "http://192.168.1.83:5000/datas/kill",
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};

exports.getLastHour = res => {
  request.get(
    {
      url: "http://192.168.1.83:5000/datas/hour",
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};
exports.getLastDay = res => {
  request.get(
    {
      url: "http://192.168.1.83:5000/datas/min",
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};
exports.getLastWeek = res => {
  request.get(
    {
      url: "http://192.168.1.83:5000/datas/min",
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};
exports.getLastMonth = res => {
  request.get(
    {
      url: "http://192.168.1.83:5000/datas/min",
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};

exports.getLastXMin = (res, min) => {
  request.get(
    {
      url: `http://192.168.1.83:5000/datas/min/${min}`,
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};

exports.getLastXHour = (res, hour) => {
  request.get(
    {
      url: `http://192.168.1.83:5000/datas/hour/${hour}`,
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};

exports.getLastXDay = (res, day) => {
  request.get(
    {
      url: `http://192.168.1.83:5000/datas/day/${day}`,
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};

exports.getLastXWeek = (res, week) => {
  request.get(
    {
      url: `http://192.168.1.83:5000/datas/week/${week}`,
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};

exports.getLastXMonth = (res, month) => {
  request.get(
    {
      url: `http://192.168.1.83:5000/datas/month/${month}`,
      json: true
    },
    (err, json) => {
      if (err) {
        console.error(err);
      } else {
        console.log(json);
        return res.status(200).json(json);
      }
    }
  );
};
