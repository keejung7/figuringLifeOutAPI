'use strict';
let mongoose = require('mongoose');
let Plant = mongoose.model('Plants');

function listAllPlants(req, res) {
    Plant.find({}, function(err, plant) {
        if (err)
            res.send(err);
        res.json(plant);
    });
};

function createPlant(req, res) {
    let newPlant = new Plant(req.body)
    newPlant.save(function(err, plant) {
        if (err)
            res.send(err);
        res.json(plant);
    });
};

function getPlant(req, res) {
    Plant.findById(req.params.id, function(err, plant) {
        if (err)
            res.send(err);
        res.json(plant);
    });
};

function updatePlant(req, res) {
    Plant.findOneAndUpdate({_id: req.params.id}, req.body, {new:true}, function(err, plant) {
        if (err)
            res.send(err);
        res.json(plant);
    });
};

function deletePlant(req, res) {
    Plant.deleteOne({_id: req.params.id}, function(err, plant) {
        if (err)
            res.send(err);
        res.json({ message: 'Plant successfully deleted'});
    });
};

module.exports = { listAllPlants, createPlant, getPlant, updatePlant, deletePlant }