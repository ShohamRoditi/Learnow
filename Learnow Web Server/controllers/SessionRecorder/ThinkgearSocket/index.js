import { sessionObj } from '../SessionObject.js'
import open from 'open'
import { getAvarageAttention, getAvarageMeditation } from '../../SessionAnalyzer/index.js'

export const socketWithThinkgear = (serverIOService, soc, rooms) => {

    /** when TGC is disconnecting
     * remove all clients from room when TGC has disconnected in case of forcely power of sensors
     * remove session data when TGC has disconnected in the middle of a session
     */
    soc.on('disconnect', () => {
        rooms.forEach(obj => {
            if (obj.neuro === soc.id) {
                const roomName = obj.roomName
                serverIOService.sockets.in(roomName).emit('room closed', false)
                serverIOService.of('/').in(roomName).clients((error, sockets) => {
                    if (error) throw error
                    sockets.forEach(s => {
                        serverIOService.sockets.sockets[s].leave(roomName)
                    })
                })
                rooms.splice(obj.roomNumber - 1, 1)
            }
        })
    })

    /** create room for TGC and react */
    soc.on('new TGC connection', ip => {
        console.log('new TGC connection', ip)
        const roomData = serverIOService.sockets.adapter.rooms[ip]
        soc.broadcast.emit('new TGC', )
        /** check if room does not exist */
        if (!roomData){
            /** if room does not exist, update parameters in session object */
            const obj = sessionObj()
            obj.roomName = ip
            obj.roomNumber = rooms.length + 1
            obj.neuro = soc.id
            /** save session object in the array of all active objects */
            rooms.push(obj)
            /** create a room with the same name as ip address obtained from the client PC */
            soc.join(ip)
        }
        serverIOService.sockets.in(ip).emit('TGC connected to room', ip)
        // open('http://localhost:3000/Session'/*, {app: 'google chrome'}*/)
    })

     /** fetch data from neurosky TGC server and send it to react client */
    soc.on('session data', ({ data, ip }) => {
        rooms.forEach(e => {
            if (e.roomName === ip && e.isReadyForVideo) {
                e.sessionData.monitorData.push(data)
                e.counter++
                if (e.counter % e.config.active_session_avarage_after_seconds === 0) {
                    const tempArr = []
                    for(let i = e.stopIndex; i < e.counter; i++) {
                        tempArr.push(e.sessionData.monitorData[i])
                    }
                    e.stopIndex = e.counter
                    const avgAttention = getAvarageAttention(tempArr)
                    const avgMeditation = getAvarageMeditation(tempArr)
                    serverIOService.sockets.in(ip).emit('avarage in worked session', ({attention: avgAttention, meditation: avgMeditation}))
                }
                serverIOService.sockets.in(ip).emit('data to client', data)
            }
        })
    })
}