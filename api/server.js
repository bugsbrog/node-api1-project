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

module.exports = server;
