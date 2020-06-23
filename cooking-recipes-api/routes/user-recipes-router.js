const express = require('express');
const sendErrorResponse = require('./helper.js').sendErrorResponse;
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017";
const dbname = 'cooking';
const router = express.Router({mergeParams: true});
const indicative = require('indicative');
const ObjectId = require('mongodb').ObjectId;

router.get('/', (req, res) => {
    const db = req.app.locals.db;
    db.collection('recipes')
        .find({author_id: req.params.userId})
        .sort({time_registration: 1})
        .toArray().then(recipes => res.json(recipes)).catch(err => {
            sendErrorResponse(req, res, 500, `Server error: ${err.massage}`, err);
        })
});

router.get('/:recipeId', (req, res) => {
    console.log(req.params.recipeId);
    const db = req.app.locals.db;
    db.collection('recipes')
      .findOne(new ObjectId(req.params.recipeId))
      .then(recipe => res.json(recipe))
      .catch(err => {
        sendErrorResponse(req, res, 500, `Server error: ${err.massage}`, err);
      })
})

router.post('/', (req, res) => {
    console.log(req.params.userId);
    const db = req.app.locals.db;
    recipe = req.body;
    const rules = {
        recipe_name: 'string',
        description: 'string|max:256',
        time_preparation: 'number|integer:0,120',
        ingredients: 'array',
        recipe_picture: 'string',//add required
        detailed_description: 'string|max:2048',
        tags: 'array',
        time_registration: 'string',
        time_last_modification: 'string'
    };

    indicative.validator.validate(recipe, rules, {}, { removeAdditional: true }).then(recipe => {
        recipe.author_id = req.params.userId;
        db.collection('recipes').insertOne(recipe).then(response => {
            if(response.result.ok && response.insertedCount === 1){
                res.status(201).location(`api/users/${recipe.author_id}/recipes/${recipe._id}`).json(recipe);
            }else{
                sendErrorResponse(req, res, 400, `Bad request.`);
            }
        }).catch(err => {
            console.log(`Insert was not successfull for recipe ${recipe}`)
            sendErrorResponse(req, res, 500, `Server error: ${err.massage}`, err);
        })
    }).catch(err => {
        console.log(`Some form field are filled incorrectly.`)
        sendErrorResponse(req, res, 400, `Some form fields are filled incorrectly: ${err.massage}`, err);
    })
})

router.delete('/:recipeId', (req, res) => {
    const db = req.app.locals.db;
    db.collection('recipes').deleteOne({ "_id": ObjectId(req.params.recipeId) }).then(response => {
        if (response.deletedCount === 1 && response.result.ok) {
            sendErrorResponse(req, res, 200, `Delete recipe with ID=${req.params.recipeId}`);
        } else {
            sendErrorResponse(req, res, 500, 400, `Bad request.`);
        }
    }).catch(err => {
        console.log(err);
        console.log(`Error: Delete was not successfull.`);
        sendErrorResponse(req, res, 500, `Server error: ${err.massage}`, err);
    })
});

router.put('/:recipeId', (req, res) => {
    const db = req.app.locals.db;
    const recipe = req.body;
    const rules = {
        recipe_name: 'string',
        description: 'string|max:256',
        time_preparation: 'integer:0,120',
        ingredients: 'array',
        recipe_picture: 'string',//add required
        detailed_description: 'string|max:2048',
        tags: 'array',
        time_last_modification: 'string'
    };

    indicative.validator.validate(recipe, rules, {}, { removeAdditional: true }).then(recipe => {
        db.collection('recipes').updateOne({ "_id": new ObjectId(req.params.recipeId) }, { $set: recipe }).then(response => {
            if(response.result.ok && response.modifiedCount === 1){
                console.log(`Recipe updated ${recipe}`);
                res.status(200).json(recipe);
            }else{
                sendErrorResponse(req, res, 400, `Bad request.`);
            }
        }).catch(err => {
            console.log(`Update was not successfull for recipe ${recipe}`)
            sendErrorResponse(req, res, 500, `Server error: ${err.massage}`, err);
        })
    }).catch(err => {
        console.log(err)
        sendErrorResponse(req, res, 400, `Some form fields are filled incorrectly: ${err.massage}`, err);
    })
})

module.exports = router;