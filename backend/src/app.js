
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const spaceRoutes = require('./routes/spaceRoutes');
const formRoutes = require('./routes/formRoutes')
const widgetRoutes = require('./routes/widgetRoutes')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api', dashboardRoutes);
app.use('/api', spaceRoutes);
app.use('/api', formRoutes);
app.use('/api', widgetRoutes);
app.use('/api', userRoutes);
app.use('/api', adminRoutes);


module.exports = app;
