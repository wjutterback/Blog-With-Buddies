"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const connection_1 = require("./config/connection");
const routes_1 = require("./routes/routes");
const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({
    layoutsDir: path.join(__dirname, 'views/layouts'),
    partialsDir: path.join(__dirname, 'views'),
    extname: '.hbs',
});
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', '.hbs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes_1.default);
connection_1.sequelize.sync({ force: true }).then(() => {
    app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});
