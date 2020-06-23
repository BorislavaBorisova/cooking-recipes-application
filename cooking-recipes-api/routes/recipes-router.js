const express = require('express');
const sendErrorResponse = require('./helper.js').sendErrorResponse;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const router = express.Router({mergeParams: true});
const ObjectId = require('mongodb').ObjectId;

router.get('/', (req, res) => {
    const db = req.app.locals.db;
    db.collection('recipes').find()
        .toArray().then(recipes => res.json(recipes)).catch(err => {
            sendErrorResponse(req, res, 500, `Server error: ${err.massage}`, err);
        })
});

module.exports = router;