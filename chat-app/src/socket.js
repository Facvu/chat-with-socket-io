
import { io } from "socket.io-client"

//const s = io('wss://192.168.0.2:3005/', { forceNew: true, autoConnect: false })
const s = io('https://bgv647hp-3005.brs.devtunnels.ms/', { forceNew: true, autoConnect: false })

export default s