const Task = require('../models/taskModel.js')

// to get all task
exports.getAllTask =  async (req, res) => {
    try {
        const task = await Task.findAll()
        
        if(task.length <= 0){
            res.status(404).send({
                task
            })
            return
        }
        res.status(200).send({
            task
        })
    } catch (error) {
        res.status(500).send({
            error : error.message
        })
    }
}

//to add task
exports.addTask = async (req, res) => {
    try {
        const {task, deadline, urgensi} = req.body
        const newTask = await Task.create({task, deadline, urgensi})
        res.status(201).send({
            message : "New data added successfully",
            newTask
        })
    } catch (error) {
        res.status(500).send({
            error : error.message
        })
    }
}

//to delete task
exports.deleteTask = async (req, res) => {
    try {
        const {id} = req.params
        const checkData = await Task.findOne({
            where : {
                id
            }
        })
        if(checkData) { 
            await Task.destroy({
                where: {
                    id
                }
            })
            res.send({
                message : "Task has been deleted",
                deletedData : checkData
            })
            res.status(204)
            return
        }
        res.status(404).send({
            message : "Task not found"
        })

    } catch (error) {
        res.status(500).send({
            error : error.message
        })
    }
}

//to edit task
exports.editTask = async (req, res) => {
    try {
        const {id} = req.params
        const {task, deadline, urgensi} = req.body
        const checkData = await Task.findOne({
            where : {
                id
            }
        })
        if(checkData){
            await Task.update({
                task : task || Task.task,
                deadline : deadline || Task.deadline,
                urgensi : urgensi || Task.urgensi
            },{
                where : {
                    id
                }
            })
            res.status(200).send({
                message : "Edit data successfully",
                updatedData : checkData
            })
            return
        } 
    } catch (error) {
        res.status(500).send({
            error : error.message
        })
    }
}