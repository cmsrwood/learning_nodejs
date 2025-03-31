const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const clientesRoutes = require('./routes/clientes');
const empleadosRoutes = require('./routes/empleados');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/clientes', clientesRoutes);
app.use('/api/empleados', empleadosRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});