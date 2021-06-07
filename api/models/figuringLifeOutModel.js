'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PlantSchema = new Schema({
    scientific_name: {
        type: String,
        default: ''
    },
    probability: {
        type: Number,
        default: -1.0
    },
    common_name: {
        type: String,
        default: ''
    },
    url: {
        type: String,
        default: ''
    },
    taxonomy: {
        type: Array,
        default: []
    },
    created_date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Plants', PlantSchema);