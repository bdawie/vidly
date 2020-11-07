const fs = require('fs');
const path = require('path');


const log = (req, res, next) => {
    console.log('logging...');

    fs.writeFile(path.resolve(__dirname, 'log.txt'), req.body, (err) => {
        if (err) {
            console.log('error');
            return next();
        }

        console.log('body was written successfully!');
        next();
    });
}

module.exports = log;