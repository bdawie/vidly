const Joi = require('joi');
const express = require('express');

const router = express.Router();


const genres = [];
let idCounter = 0;

router.get('/', (req, res) => {
    return res.json(genres);
});

router.post('/', (req, res) => {
    const genre = req.body;

    const error = validate(genre);

    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    genres.push({...genre, id: ++idCounter});
    return res.json(genre); 
});

router.put('/:id', (req, res) => {

    const error = validate(req.body);

    if ( error ) {
        return res.status(400).send(error.details[0].message);
    }

    const genre = findGenre(+req.params.id);
    
    if (!genre) {
        return  genreNotFoundMessage(res);
     }

    genre.name = req.body.name;

    res.send(genre);
});

router.delete('/:id', (req, res) => {
    const genre = findGenre(+req.params.id);

    if (!genre) {
       return  genreNotFoundMessage(res);
    }

    const genreIndex = genres.indexOf(genre);
    genres.splice(genreIndex, 1);
    res.send(genre);
});

router.get('/:id', (req, res) => {
    const genre = findGenre(+req.params.id);

    if (!genre) {
        return  genreNotFoundMessage(res);
     }

    res.send(genre);
});

const validate = (body) => {
    const joiSchema = Joi.object({
        name: Joi.string().min(5).max(20).required(),
        description: Joi.string().required()
    });

    const { error } = joiSchema.validate(body);
    return error;
};

const findGenre = id => {
    return genres.find(genre => genre.id === id);
}

const genreNotFoundMessage = res => {
        return res.status(404).send('Genre not found!');
}

module.exports = router;