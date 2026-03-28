const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: "localhost",
    port: 3307,
    user: "root",
    password: "root",
    database: "loja_de_carros"
});

async function create_table(){
    await pool.query('USE loja_de_carros');
    
    await pool.query(`
        CREATE TABLE IF NOT EXISTS carros (
            id INT PRIMARY KEY AUTO_INCREMENT,
            modelo VARCHAR(255) NOT NULL,
            marca VARCHAR(255) NOT NULL,
            ano INT NOT NULL
        )
    `);
}

module.exports = {pool, create_table};

// Singleton -> Cria uma única instância da conexão do banco de dados ou outras conexões, na nossa aplicação.