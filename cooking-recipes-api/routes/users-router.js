const express = require('express');
const sendErrorResponse = require('./helper.js').sendErrorResponse;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbname = 'cooking';
const router = express.Router();
const indicative = require('indicative');
const ObjectId = require('mongodb').ObjectId;

router.get('/', (req, res) => {
    const db = req.app.locals.db;
    db.collection('users').find({}, { projection: { password: 0 } }).toArray()
        .then(users => {
            res.json(users);
        });
});

router.post('/', (req, res) => {
    const db = req.app.locals.db;
    const user = req.body;

    const rules = {
        first_name: 'regex:^[a-zA-Z]*$',
        last_name: 'regex:^[a-zA-Z]*$',
        username: 'required|regex:^\\w*$|max:15',
        about: 'string|max:512',
        password: 'required|regex:(?=.*\\d)(?=.*[^a-zA-Z0-9]).+|min:8',
        profile_picture: 'string',
        time_registration: 'string',
        time_last_modification: 'string',
        gender: [indicative.validator.validations.regex(['^(male|female|other)$'])],
        role: [indicative.validator.validations.regex(['^(user|admin)$'])],
        status: [indicative.validator.validations.regex(['^(active|suspended|deactivated)$'])]
    };

    indicative.validator.validate(user, rules, {}, { removeAdditional: true }).then(user => {
        // const db = req.app.locals.db;
        db.collection('users').insertOne(user).then(response => {
            if (response.result.ok && response.insertedCount === 1) {
                console.log(`user has been signed in ${user}`);
                res.status(201).location(`/api/users/${user._id}`).json(user);
            } else {
                sendErrorResponse(req, res, 500, `Server error`);//?
            }
        }).catch(err => {
            console.log(`Error: Insert was not successfull.`);
            sendErrorResponse(req, res, 500, `Server error: ${err.massage}`, err);
        })
    }).catch(err => {
        console.log(err); //REMOVE
        sendErrorResponse(req, res, 400, `Some form fields are filled incorrectly: ${err.massage}`, err);
    })
});

router.get('/:userId', (req, res) => {
    const db = req.app.locals.db;
    db.collection('users').findOne(new ObjectId(req.params.userId)).then(user => {
        if (!user) {
            sendErrorResponse(req, res, 404, `This user does not exist.`);
        }
        res.json(user);
    })
});

router.post('/login', (req, res) => {
    const db = req.app.locals.db;
    const password = req.body.password;
    const username = req.body.username;
    
    db.collection('users').findOne({username: username, password: password}).then(user => {
        if (!user) {
            sendErrorResponse(req, res, 404, `Wrong username or password.`);
        }
        res.json(user);
    })
});

router.delete('/:userId', (req, res) => {
    const db = req.app.locals.db;
    db.collection('users').deleteOne({ "_id": ObjectId(req.params.userId) }).then(response => {

        if (response.deletedCount === 1 && response.result.ok) {
            sendErrorResponse(req, res, 200, `Delete user with ID=${req.params.userId}`);
        } else {
            sendErrorResponse(req, res, 404, `No user with ID= ${req.params.userId}`);
        }
    }).catch(err => {
        console.log(err);
        console.log(`Error: Delete was not successfull.`);
        sendErrorResponse(req, res, 500, `Server error: ${err.massage}`, err);
    })
});

router.put('/:userId', (req, res) => {
    const db = req.app.locals.db;
    const user = req.body;
    const rules = {
        first_name: 'regex:^[a-zA-Z]*$',
        last_name: 'regex:^[a-zA-Z]*$',
        about: 'string|max:512',
        password: 'accepted|regex:(?=.*\\d)(?=.*[^a-zA-Z0-9]).+|min:8',
        profile_picture: 'string',
        time_last_modification: 'string',
        gender: [indicative.validator.validations.regex(['^(male|female|other)$'])],
        role: [indicative.validator.validations.regex(['^(user|admin)$'])],
        status: [indicative.validator.validations.regex(['^(active|suspended|deactivated)$'])]
    };

    indicative.validator.validate(user, rules, {}, { removeAdditional: true }).then(user => {
        db.collection('users').updateOne({ "_id": new ObjectId(req.params.userId) }, { $set: user }).then(response => {
            if (response.result.ok && response.modifiedCount === 1) {
                sendErrorResponse(req, res, 200, `Updated user with ID=${req.params.userId}`);
            } else {
                sendErrorResponse(req, res, 500, `Server error`);//?
            }
        }).catch(err => {
            console.log(`Error: Update was not successfull.`);
            sendErrorResponse(req, res, 500, `Server error: ${err.massage}`, err);
        })
    }).catch(err => {
        sendErrorResponse(req, res, 400, `Some form fields are filled incorrectly.`, err);
    })
});

module.exports = router;