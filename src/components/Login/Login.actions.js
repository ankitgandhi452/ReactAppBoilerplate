import { LOGIN_INIT, LOGIN_SUCCESS, LOGIN_FAILURE } from './Login.constants'

const initLoginCreator = () => ({
  type: LOGIN_INIT
})

const performLogin = ({ email, password }) =>
  async (disptach, getState, { apiInstance }) =>
    disptach(initLoginCreator())

const dummy = () => { }

export { performLogin, dummy }
