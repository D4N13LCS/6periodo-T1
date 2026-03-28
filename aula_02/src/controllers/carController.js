const carRepository = require('../repositories/carRepository');

//Listar 

async function listCars(req, res){
    const cars = await carRepository.getAllCars();
    res.json(cars);
}

//Listar carro específico 

async function getCar(req, res){
    const car = await carRepository.getCarsById(req.params.id);

    if (!car){
        return res.status(404).json({error: "Carro não encontrado"});
    }

    res.json(car);
}

//registrar novo carro

async function createCar(req, res){
    const car = await carRepository.registerCar(req.body);

    if (!car){
        return res.status(400).json({error: "Os campos modelo, marca e ano são obrigatórios"});
    }

    res.json(car);
}

//Atualizar os dados de um carro existente

async function updateCar(req, res){
    if (!req.body){
        return res.status(400).json({error: "Insira ao menos um atributo para atualização"});
    }

    const car = await carRepository.updateCar(req.params.id, req.body);

    if (!car){
        return res.status(404).json({error: "Carro não encontrado"});
    }

    res.json(car);
}

//Deletar um carro

async function deleteCar(req, res){
    const car = await carRepository.destroyCar(req.params.id);

    if (!car){
        return res.status(404).json({error: "Carro não encontrado"});
    }

    res.json({message: car});
}

module.exports = {
    listCars, 
    getCar,
    createCar, 
    updateCar,
    deleteCar
}