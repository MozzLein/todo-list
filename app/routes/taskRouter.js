const express = require('express')
const router = express.Router()
const {getAllTask, addTask, deleteTask, editTask} = require("../controllers/taskController")
const {userRegister, userLogin} = require("../controllers/userController")

router.get('/main', getAllTask)
router.post('/addtask', addTask)
router.put('/edittask/:id', editTask)
router.delete('/deletetask/:id', deleteTask)

router.post('/register', userRegister)
router.post('/login', userLogin)

module.exports = router