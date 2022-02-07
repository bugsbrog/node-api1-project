const express = require('express')
const Users = require('./users/model')
const server = express()

server.use(express.json())

server.get('/api/users', async (req, res) => {
    try {
        const user = await Users.find()
        res.json(user)
    } catch {
        res.status(500).json({
            message: 'The users information could not be retrieved'
        })
    }
})

server.get('/api/users/:id', async (req, res) => {
        try {
            const { id } = req.params
            const userId = await Users.findById(id)
                if (!userId) {
                   res.status(404).json({
                       message: 'The user with the specified ID does not exist'
                   })
                } else {
                    res.json(userId)
                }
            } catch {
                res.status(500).json({
                    message: 'The user information could not be retrieved'
                })
            }
})

server.post('/api/users', async (req, res) => {
        try {
            const { name, bio } = req.body
            const postUser = await Users.insert({ name, bio })
                if (!name || !bio) {
                    res.status(400).json({
                        message: 'Please provide name and bio for the user'
                    })
                } else {
                    res.status(201).json(postUser)
                }
            } catch {
                res.status(500).json({
                    message: 'There was an error while saving the user to the database'
                })
            }
})







module.exports = server
