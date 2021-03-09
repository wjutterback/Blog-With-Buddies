import * as path from 'path';
import * as express from 'express';
import * as exphbs from 'express-handlebars';
import { sequelize } from './config/connection';
import routes from './routes/routes';

const app = express();
const PORT = process.env.PORT || 3001;
const hbs = exphbs.create({
  //TODO: Fix compile so that dist has the views folders found in src
  //TODO: Figure out what's going on with the path/dist folder mix-up
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

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});

//TODO: Study more TypeScript
