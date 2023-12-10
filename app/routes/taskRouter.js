const express = require('express')
const router = express.Router()
const {getAllTask, addTask, deleteTask, editTask} = require("../controllers/taskController")

router.get('/', getAllTask)
router.post('/addtask', addTask)
router.put('/edittask/:id', editTask)
router.delete('/deletetask/:id', deleteTask)

module.exports = router