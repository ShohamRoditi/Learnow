import {
  IS_VIDEO_ENDED
} from '../ActionTypes/QuizActionType'

const initialState = {
  IsVideo: false
}

export default (state = initialState, action) => {
  switch (action.type) {
      
    case IS_VIDEO_ENDED:
      return {
        ...state,
        IsVideo: action.data
      }
    default:
      return state
  }
}
