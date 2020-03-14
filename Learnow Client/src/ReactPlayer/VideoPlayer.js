import React from 'react'
import socketIOClient from 'socket.io-client'
import { WrapperVideo, Video } from './VideoStyle'


export const VideoPlayer = ()=>{

  const webServerURL = 'http://127.0.0.1:13855'
  const socketToWebServer = socketIOClient(webServerURL)

  socketToWebServer.on('connected', data => console.log(data, 'with web server'))
  socketToWebServer.on('session ended from headset', () => {
    console.log('session ended from headset')
  })

  const onStartVideo = () => {
    socketToWebServer.emit('ready for data stream', )
    socketToWebServer.on('data to client', data => {
      console.log(data)
    })
  }

  const onEndVideo = () => {
    socketToWebServer.emit('end of video', )
  }

  // socketToWebServer.on('session ended by headset', () => {
  //   console.log('session ended from headset')
  // })
    return <WrapperVideo>
             <Video
              url="https://www.youtube.com/watch?v=DIJYAWB3MhI"
              controls={true}
              onStart = {onStartVideo}
              onEnded = {onEndVideo}
              // wrapper={Video}
              // width={'50%'}
              // height={450}
            />
          </WrapperVideo>
  
}