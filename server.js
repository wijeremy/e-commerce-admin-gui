require('dotenv').config();
const express = require('express');
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./controllers');
const sequelize = require('./config/connection');
var mysql = require('mysql2');

const app = express();
const PORT = process.env.PORT || 3001;
var connection = mysql.createConnection(process.env.JAWSDB_URL);

const hbs = exphbs.create({});
//add JWT access token here.

// Inform Express.js on which template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);
connection.connect();

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
