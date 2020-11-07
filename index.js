const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
// const config = require('config');

const genres = require('./api/genres/genres');

const app = express();

const port = process.env.PORT || 3000;

app.set('view engine', 'pug');

app.use(helmet());

if ( app.get('env') === 'development') {
    app.use(morgan('short'));
    console.log('Morgan enabled!');
}

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/genres', genres);

app.get('/', (req, res) => {
    res.render('home/index', {title: 'Vidly App', header: 'Welcome to Vidly!'});
});

app.listen(port, () => {
    console.log('Running on port ' + port);
});
