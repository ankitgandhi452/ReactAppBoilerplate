import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import LoginWrapper from './Login.wrapper'
import { performLogin } from './Login.actions'

class LoginContainer extends PureComponent {
  componentDidMount () {
    const { actions } = this.props
    actions.login({ email: 'ankit@gmail.com', password: 'password' })
  }

  render () {
    return <LoginWrapper />
  }
}

const mapStateToProps = state => ({
  loading: state.login.loading
})

const mapDispatchToProps = dispatch => ({
  actions: {
    login: loginDetails => {
      return dispatch(performLogin(loginDetails))
    }
  }
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer)
)
