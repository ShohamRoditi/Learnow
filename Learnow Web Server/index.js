import { serverIOService, connectionToServerIO/*, clientIOService, connectionToClientIO */} from './controllers/Thinkgear/ThinkgearIO.ctl.js'
// import { } from './controllers/Client/ClientIO.ctl.js'

serverIOService.on('connection', soc => connectionToServerIO(soc))

// clientIOService.on('connection', soc => connectionToClientIO(soc))


// ioServer.on('connection', soc => connectionToThinkGear(soc))

// clientIO.on('connection', soc => connctionToClient(soc))

// clientIO.on('connection', soc => {
//     soc.on('session data', data => {
//         console.log('client data: ', data)
//     })
// })
