import { combineReducers } from 'redux'

import auth from './auth-reducer'
import error from './error-reducer'
import notification from './notification-reducer'
import user from './user-reducer'
import support from './support-reducer'
import delivery from './delivery-reducer'

export default combineReducers({
    auth,
    error,
    notification,
    user,
    support,
    delivery,
})
