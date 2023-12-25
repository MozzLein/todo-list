const express = require('express')
const router = express.Router()
const {getAllTask, addTask, deleteTask, editTask} = require("../controllers/taskController")
const {userRegister, userLogin, userProfile, editUserProfile, deleteUserProfile, userChangePassword} = require("../controllers/userController")
const {verifyToken} = require("../middleware/authMiddleware")

router.get('/main',verifyToken, getAllTask)
router.post('/addtask',verifyToken, addTask)
router.put('/edittask/:id',verifyToken, editTask)
router.delete('/deletetask/:id',verifyToken, deleteTask)

router.post('/register', userRegister)
router.post('/login', userLogin)

//need to add verifyToken later
router.get('/profile/:id', userProfile)
router.put('/profile/edit/:id', verifyToken, editUserProfile)
router.delete('/profile/delete/:id', verifyToken, deleteUserProfile)
router.post('/profile/change-password/:id', verifyToken, userChangePassword)
module.exports = router