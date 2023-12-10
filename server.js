const express = require('express')
const app = express();
const router = require('./app/routes/taskRouter')
app.use(express.json());
app.use('/', router);

app.listen(3000, ()=>console.log('app running on http://localhost:3000'))