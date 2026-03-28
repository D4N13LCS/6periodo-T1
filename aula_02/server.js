const app = require('./src/app');
const connectmongo = require("./src/config/mongo");
const create_table = require('./src/config/mysql').create_table;

const PORT = 3000;

async function startServer() {
    await connectmongo();
    await create_table();
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta: ${PORT}`);
    });
}

startServer()