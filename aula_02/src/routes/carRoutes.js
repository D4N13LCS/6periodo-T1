const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

//GET
router.get('/cars', carController.listCars);

//GET by ID
router.get('/cars/:id', carController.getCar);

router.post('/cars/create', carController.createCar);

router.put('/cars/edit/:id', carController.updateCar);

router.delete('/cars/:id/destroy', carController.deleteCar);

module.exports = router;