import * as path from 'path';
import * as express from 'express';
import * as exphbs from 'express-handlebars';
import { sequelize } from './config/connection';
import routes from './routes/routes';

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
app.use(routes);

sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
});
