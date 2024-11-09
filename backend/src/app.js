
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const formRoutes = require('./routes/formRoutes')
const widgetRoutes = require('./routes/widgetRoutes')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', spaceRoutes);
app.use('/api', formRoutes);
app.use('/api', widgetRoutes);


module.exports = app;
