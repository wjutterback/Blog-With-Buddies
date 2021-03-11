const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const sequelize = require('./config/connection');
const routes = require('./routes/routes');

const app = express();
const PORT = process.env.PORT || 3030;
const hbs = exphbs.create({
  layoutsDir: path.join(__dirname, '/views/layouts'),
  partialsDir: path.join(__dirname, '/views'),
  extname: '.hbs',
});

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', hbs.engine);
app.set('view engine', '.hbs');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);

app.use(express.static('public'));

sequelize.sync({ force: true }).then(() => {
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});
