const express = require("express");
const app = express();
const path = require('path')

const server = require("http").createServer()
const { Server } = require("socket.io");

const crypto = require('crypto-js')

app.use('/', express.static(path.join(__dirname, "public")));


app.get('/asd', (req, res, next) => {

    return res.send('asd')
})

io = new Server(server, {
    cors: {
        origin: '*'
    }
})

io.listen(3005, function () {
    console.log("Servidor corriendo en http://localhost:3005");
});
io.use((socket, next) => {
    const name = socket.handshake.auth.name
    if (!name /*|| users.some(u => u.name === name)*/)
        return next(new Error('Invalidname'))
    socket.name = name
    next()
})
let users = []
let messages = {}
io.on('connect', (socket) => {
    console.log(socket.name + ' is connected ')
    const existingUser = users.find((user) => user.name === socket.name);
    if (!existingUser) {
        const newUser = {
            id: socket.id,
            name: socket.name, // Asegúrate de que socket.name esté configurado en algún lugar
            connected: true,
            messages: {},
        };
        users.push(newUser);
    } else {
        users = users.map(u => {
            const key = u.name < socket.name ? u.name + socket.name : socket.name + u.name;
            const hash0 = crypto.HmacSHA256(key, 'fchat').toString()
            let user = {}
            if (u.name === socket.name)
                user = { ...u, id: socket.id, connected: true }
            else
                user = { ...u, messages: { ...messages, [hash0]: messages[hash0] } }
            return user
        })
    }
    socket.onAny((ev, ...args) => {
        console.log(ev, args)
    })
    socket.emit('users', users)
    socket.broadcast.emit('user_connected', { id: socket.id, name: socket.name, connected: true, messages: {} })
    socket.on('disconnect', (reason) => {
        console.log(`${socket.name} is disconnected`)
        users = users.map(u => {
            if (u.name === socket.name)
                u.connected = false
            return u
        })
        const u = users.find(u => u.name === socket.name)
        socket.broadcast.emit('user_disconnected', u)
    })
    // socket.on('send-msg', (args) => {
    //     const { message } = args
    //     msgs.push(message)
    //     console.log(msgs)
    //     socket.broadcast.emit('message', message)
    // })

    socket.on('p-message', ({ content }) => {
        try {
            const key = content.from < content.name ? content.from + content.name : content.name + content.from;
            const hash0 = crypto.HmacSHA256(key, 'fchat').toString()
            const sId = users.find(u => u.name === content.name).id
            console.log(hash0)
            if (!messages[hash0]) {
                messages[hash0] = []
            }
            messages[hash0].push(content)
            users = users.map(u => {
                if (u.name === content.name || u.name === content.from)
                    u.messages[hash0] = messages[hash0]
                return u
            })
            socket.to(sId).emit('p-message', {
                content,
                from: socket.id
            })
            socket.to(sId).emit('rescroll', 'rescroll')
        } catch (err) {
            console.log(err)
        }

    })
})



