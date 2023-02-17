const request = require('request');

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
			temperature: getRandomFloat(0, 100),
			pressure: getRandomFloat(0, 100),
			humidity: getRandomFloat(0, 100),
			light: getRandomFloat(0, 100),
			reduced: getRandomFloat(0, 100),
			oxidised: getRandomFloat(0, 100),
			ammoniac: getRandomFloat(0, 100),
			particules0: getRandomFloat(0, 100),
			particules1: getRandomFloat(0, 100),
			particules2: getRandomFloat(0, 100),
			date: date.toISOString()
		};
		dummyData.push(obj);
	}
	return dummyData;
}

exports.dataConsolidation = (req, res) => {
	const now = new Date();
	const tenMinutesAgo = new Date(now.getTime() - 10 * 60 * 1000);

	const last10MinutesData = buildDummyDatas().filter(
		(obj) => new Date(obj.date) >= tenMinutesAgo
	);


	const averageData = {
		temperature: calculateAverage('temperature', last10MinutesData),
		pressure: calculateAverage('pressure', last10MinutesData),
		humidity: calculateAverage('humidity', last10MinutesData),
		light: calculateAverage('light', last10MinutesData),
		reduced: calculateAverage('reduced', last10MinutesData),
		oxidised: calculateAverage('oxidised', last10MinutesData),
		ammoniac: calculateAverage('ammoniac', last10MinutesData),
		particules0: calculateAverage('particules0', last10MinutesData),
		particules1: calculateAverage('particules1', last10MinutesData),
		particules2: calculateAverage('particules2', last10MinutesData)
	};
	// console.log('average: ', averageData);
	// res.status(200).json(last10MinutesData);
	res.status(200).json(averageData);
};

function calculateAverage(property, data) {
	let sum = 0;
	for (let i = 0; i < data.length; i++) {
	  sum += data[i][property];
	}
	return parseFloat((sum / data.length).toFixed(2));
  }

exports.getStreamData = (req, res) => {
	request.get(
		{
			url: 'http://192.168.1.174:5000/datas',
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

exports.stopStream = (res) => {
	request.get(
		{
			url: 'http://192.168.1.174:5000/datas/kill',
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

exports.getLastHour = (res) => {
	request.get(
		{
			url: 'http://192.168.1.174:5000/datas/hour',
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
exports.getLastDay = (res) => {
	request.get(
		{
			url: 'http://192.168.1.174:5000/datas/min',
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
exports.getLastWeek = (res) => {
	request.get(
		{
			url: 'http://192.168.1.174:5000/datas/min',
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
exports.getLastMonth = (res) => {
	request.get(
		{
			url: 'http://192.168.1.174:5000/datas/min',
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
			url: `http://192.168.1.174:5000/datas/min/${min}`,
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
			url: `http://192.168.1.174:5000/datas/hour/${hour}`,
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
			url: `http://192.168.1.174:5000/datas/day/${day}`,
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
			url: `http://192.168.1.174:5000/datas/week/${week}`,
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
			url: `http://192.168.1.174:5000/datas/month/${month}`,
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
