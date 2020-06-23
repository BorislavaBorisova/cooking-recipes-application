const mongoose = require('mongoose');

const RecipeSchema = mongoose.Schema({
    _id : String,
    author_id : String,
    recipe_name : {
        type : String,
        required : true
    },
    description : String,
    time_preparation : Number,
    ingredients : {
        type : [String],
        required : true,
    },
    recipe_picture : {
        type : String,
        required : true
    },
    detailed_description : String,
    tags : [String],
    time_registration : Date,
    time_last_modification : Date
});

module.exports = mongoose.model('Recipes', RecipeSchema);