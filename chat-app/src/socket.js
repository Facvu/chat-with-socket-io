
import { io } from "socket.io-client"
import { config } from "./config"

const s = io(config.CONNECTION_URL, { forceNew: true, autoConnect: false })
//const s = io('https://socket-fi88.onrender.com/', { forceNew: true, autoConnect: false })

export default s