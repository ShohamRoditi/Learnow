import { IS_VIDEO_ENDED, IS_CONNECTED_TO_ROOM, UPDATE_ROOM_NUMBER, LAST_SESSION_DATA, IS_FIRST_SESSION, LOGIN, LOGOUT, REGISTER, IS_VERIFY } from '../ActionTypes'

export const isVideoEnded = data => ({ type: IS_VIDEO_ENDED, data: data })

export const isConnectedToRoom = isConnected => ({type: IS_CONNECTED_TO_ROOM, data: isConnected})

export const updateRoomNumber = roomNumber => ({type: UPDATE_ROOM_NUMBER, data: roomNumber})

export const getLastSessionData = lastSessionData => ({type: LAST_SESSION_DATA, data: lastSessionData})

export const isFirstSession = isFirstSession => ({type: IS_FIRST_SESSION, data: isFirstSession})

export const login = loginData => ({type: LOGIN, data: loginData})

export const logout = () => ({type: LOGOUT, data: {}})

export const register = registerData => ({type: REGISTER, data: registerData})

export const isVerify = verified => ({type: IS_VERIFY, data: verified})