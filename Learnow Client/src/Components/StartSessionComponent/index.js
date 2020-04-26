import React from 'react'
import { useSelector } from 'react-redux'

import { ConnectionToRoom } from '../ConnectionToRoom'
import { StudentSession } from '../StudentSession'
import { ResearcherSession } from '../ResearcherSession'

export const StartSessionComponent = () => {

  const connectedToRoom = useSelector(state => state.MainReducer.isConnectedToRoom)
  const loggedUser = useSelector(state => state.MainReducer.loggedUser)

  return (
    <div>
      <ConnectionToRoom/>
      {connectedToRoom ? 
        loggedUser.userType === 'student' ? <StudentSession/> : <ResearcherSession/>
      :
        null
      }
    </div>
  )
}