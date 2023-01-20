const request = require('request');
const db = require('../models/index.js');
const Datas = db['Datas']

request.get(
    {
        url: 'http://192.168.1.174:5000/datas',
        json: true
    },
    (err, json) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Datas recupérées')
                let ammoniac = 0;
                let humidity = 0;
                let light = 0;
                let oxidised = 0;
                let particules0 = 0;
                let particules1 = 0;
                let particules2 = 0;
                let pressure = 0;
                let reduced = 0;
                let temperature = 0;
            
            let compiledDatas = []
            const datas =  json.body
            datas.forEach(data => {
                for(const[key, value] of Object.entries(data[1])){
                    switch (key) {
                        case ('ammoniac'):
                        ammoniac += parseFloat(value);
                            break;
                    
                        case ('humidity'):
                        humidity += parseFloat(value);
                            break;
                    
                        case ('light'):
                        light += parseFloat(value);
                            break;
                    
                        case ('oxidised'):
                        oxidised += parseFloat(value);
                            break;
                
                        case ('particules0'):
                        particules0 += parseFloat(value);
                            break;
                    
                        case ('particules1'):
                        particules1 += parseFloat(value);
                            break;
                    
                        case ('particules2'):
                        particules2 += parseFloat(value);
                            break;
                    
                        case ('pressure'):
                        pressure += parseFloat(value);
                            break;
                    
                        case ('reduced'):
                        reduced += parseFloat(value);
                            break;
                    
                        case ('temperature'):
                        temperature += parseFloat(value);
                            break;
                        
                            default:
                                break;
                    }
                }
            });
            const length = datas.length;
            console.log('consolidation faite en attente de persist')

            // Create and Save a new Datas
            const data = {
                ammoniac : ammoniac / length,
                humidity : humidity / length,
                light : light / length,
                oxidesed : oxidised / length,
                particules0 : particules0 / length,
                particules1 : particules1 / length,
                particules2 : particules2 / length,
                pressure : pressure / length,
                reduced : reduced / length,
                temperature : temperature / length,
                date : Date.now(),
                sensor_id : 2
            };
            // Save Datas in the database
            Datas.create(data)
                .then(data => {
                    console.log('Datas persisted successfully')
                })
                .catch(err => {
                    console.log('Some error occurred'+ err)
                });
            };
        }

);