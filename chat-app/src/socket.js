
import { io } from "socket.io-client"

//const s = io('http://192.168.0.2:3005/', { forceNew: true, autoConnect: false })
const s = io('https://socket-fi88.onrender.com/', { forceNew: true, autoConnect: false })

export default s