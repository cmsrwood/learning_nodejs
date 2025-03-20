const createApp = require('./src/app');
const connectDB = require('./src/config/db');
const port = 4400;

const startServer = async () => {
    try {
        await connectDB();
        const app = createApp();

        app.listen(port, () => {
            console.log(`Servidor ejecutandose en el puerto ${port}`);
        })
    } catch (error) {
        console.log("Error al iniciar servidor: ", error);
        process.exit(1);
    }
}

startServer();