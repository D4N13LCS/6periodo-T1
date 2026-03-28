const db = require('../config/mysql').pool;
const Car = require('../models/carModel');

//Listar 
async function getAllCars(){
    const [rows] = await db.query('SELECT * FROM carros');

    return rows.map(
        row => new Car(row.id, row.modelo, row.marca, row.ano)
    )
 };

//Buscar por id
async function getCarsById(id){
    const [rows] = await db.query('SELECT * FROM carros WHERE id = ?', [id]);

    if(!rows[0])
        return null

    const row = rows[0];
    
    return new Car(row.id, row.modelo, row.marca, row.ano);
};

//Registra um novo carro
async function registerCar({modelo, marca, ano}){
    if (modelo == null || marca == null || ano == null){
        return null
    }

    const [result] = await db.query('INSERT INTO carros (modelo, marca, ano) VALUES (?, ?, ?)', [modelo, marca, ano]);

    return new Car(result.insertId, modelo, marca, ano);
}

//Altera os dados de um carro específico
async function updateCar(id, { modelo, marca, ano }) {
    const car = await getCarsById(id);

    if (!car){
        return "carro não encontrado"
    }

    const fields = [];
    const values = [];

    if (modelo !== undefined) {
        fields.push("modelo = ?");
        values.push(modelo);
    }

    if (marca !== undefined) {
        fields.push("marca = ?");
        values.push(marca);
    }

    if (ano !== undefined) {
        fields.push("ano = ?");
        values.push(ano);
    }

    values.push(id);

    const query = `UPDATE carros SET ${fields.join(", ")} WHERE id = ?`;

    const [result] = await db.query(query, values);

    return await getCarsById(id);
}

//Deleta um carro
async function destroyCar(id){
    const car = await getCarsById(id);

    if (!car){
        return null;
    }

    await db.query('DELETE FROM carros WHERE id = ?', [id]);
    
    return 'carro deletado com sucesso';
}

module.exports ={
    getAllCars,
    getCarsById,
    registerCar,
    updateCar, 
    destroyCar
};