//Remember babel training wheels if compile fails
import * as path from 'path';
import * as express from 'express';
import * as exphbs from 'express-handlebars';
import * as sequelize from './config/connection';

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


//TODO configure TypeScript sequelize.sync().then(() => {}
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
