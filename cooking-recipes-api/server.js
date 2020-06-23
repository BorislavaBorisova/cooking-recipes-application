const express = require('express');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const usersRouter = require('./routes/users-router');
const recipesRouter = require('./routes/recipes-router');
const userRecipesRouter = require('./routes/user-recipes-router');
const url = 'mongodb://localhost:27017';
const dbname = 'cooking';
const sendErrorResponse = require('./routes/helper').sendErrorResponse;

const app = express();
app.use(cors());
const port = 8080;

app.use(express.json({limit: '50mb'}));
app.use(express.static('public'));    

app
.use('/api/users/:userId/recipes', userRecipesRouter) 
.use('/api/users', usersRouter)
.use('/api/recipes', recipesRouter);



app.get('/', (req, res) => res.send('Hello World!'));
app.post('/hello/:name', function (req, res) {
    res.type('html').send(`<h1>Hi ${req.params.name}</h1>`);
})


app.use(function (err, req, res, next) {
    console.error(err.stack);
    sendErrorResponse(req, res, 500, `Server error: ${err.message}`, err);
}) 

MongoClient.connect(url, {useUnifiedTopology : true}, function(err, con) {
    if (err) throw err;
    db = con.db(dbname);
    app.locals.db = db;
    console.log(`Connected to ${dbname}!`);
    app.listen(port, () => `Listening on //localhost:${port}`);
  });