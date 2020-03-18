const   Session      = require('../models/session.js')
        // ObjectId  = require('mongoose').Types.ObjectId;

module.exports = {
    addSession: (req, res) => {

        req.on('data', data=>{
            console.log('data db server',data.toString())
            const {startTimeStamp = null, endTimeStamp = null, monitorData=[], startQuizStamp = null, quizData = {}} = JSON.parse(data.toString())
            const session = new Session({startTimeStamp, endTimeStamp,monitorData, startQuizStamp, quizData});
            session.save().then( (result) => {
                console.log(result);
                res.status(200).send(`{"result": "Success", "params": ${JSON.stringify(result)}}`);
                },
                (err) =>{
                    console.log(err);
                    res.status(404).send(`{"result": "Failure", "params":{"startTimeStamp": "${startTimeStamp}", "endTimeStamp": "${endTimeStamp}"}, "error": ${JSON.stringify(err)}}`);
                });
        })

        const {startTimeStamp = null, endTimeStamp = null, monitorData=[]} = req.body;
        
        
        
        
        
    }
}

