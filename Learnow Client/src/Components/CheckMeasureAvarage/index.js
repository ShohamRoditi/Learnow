import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { socketToWebServer } from '../../SocketIoClient'
import { MeasureDialog } from './MeasureDialog'

export const CheckMeasureAvarage = () => {

    const isNotificationVisible = useSelector(state => state.MainReducer.isNotificationVisible)
    const loggedUser = useSelector(state => state.MainReducer.loggedUser)
    const [lowLevelWarning, setLowLevelWarning] = useState(null)
    const [showMeasureDialog, setShowMeasureDialog] = useState(false)

    useEffect(() => {
      socketToWebServer.on('avarage in worked session', ({attention, meditation}) => {
        const lowLevel = 30
        if (attention < lowLevel || meditation < lowLevel) {
          if (loggedUser.userType === 'student')
            setShowMeasureDialog(true)
        }
      })
      return () => socketToWebServer.off('avarage in worked session')
    }, [])
      
    useEffect(() => {
        if (!isNotificationVisible)
            setShowMeasureDialog(false)
    },[isNotificationVisible])

    return (
      <div>
         {lowLevelWarning} 
         {showMeasureDialog ? <MeasureDialog/> : null} 
      </div>
    )
}