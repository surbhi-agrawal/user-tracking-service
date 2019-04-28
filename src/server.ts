import * as  bodyParser from 'body-parser';
import * as express from 'express';
import * as http from 'http';
import * as path from 'path';
import * as swaggerUi from 'swagger-ui-express';
import * as YAML from 'yamljs';
// tslint:disable-next-line:no-var-requires
const api = require('./services/user.service');
// tslint:disable-next-line:no-var-requires
const events = require('./services/event.service');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set our api routes
app.use('/api', api);
app.use('/events', events);

app.get('/health', (req, res) => {
    res.send('Service is up');
});

/**
 * Get port from environment and store in Express.
 */
app.set('port', 3000);

const swaggerDocument = YAML.load('./service.yml');
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(3000, () => console.log(`API running on localhost:${3000}`));
