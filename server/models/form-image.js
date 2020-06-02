const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let validScore = [
    (score) =>{
        return score <= 5 && score >= 0; 
    },
    "El score no es valido"
];

let formImageSchema = new Schema({
    score: {
        type: Number,
        required: [true, "Es necesario el puntaje"],
        validate: validScore
    },
    comment: {
        type: String,
        required: [false]
    },
    imageOpen: {
        type: Boolean,
        required: [true, "Es necesario la respuesta sobre usar su imagen"],
        default: false
    }
});

module.exports = mongoose.model('FormImage', formImageSchema);