const request = require('request');

request.get(
    {
        url: 'http://192.168.1.137:5000/datas',
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