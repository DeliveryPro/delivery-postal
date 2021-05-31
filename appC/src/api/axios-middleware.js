import { POST } from './axios-config'

export const loginWithEmail = (data) => POST('loginWithEmail', data)
