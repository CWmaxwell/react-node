// rcc: react class conponent
import React, { Component } from 'react'
import { PropTypes } from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import { logoutUser } from '../../actions/authActions'
import { clearCurrentProfile } from '../../actions/profileActions'
class Navbar extends Component {

  onLogoutClick(e) {
      e.preventDefault()
      this.props.clearCurrentProfile()
      this.props.logoutUser()
  }
  render() {
    const { isAuthenticated, user } = this.props.auth

    const authLink = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/feed">评论</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/dashboard">Dashboard</Link>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="/register" onClick={this.onLogoutClick.bind(this)}>
                    <img style={{width:'25px', marginRight:'5px'}} className="rounded-circle" src={user.avatar} alt={user.name} />退出
                </a>
            </li>
        </ul>
    )
    const guestLink = (
        <ul className="navbar-nav ml-auto">
            <li className="nav-item">
                <Link className="nav-link" to="/register">注册</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">登陆</Link>
            </li>
        </ul>
    )
    return (
      <div>
        <nav className = "navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <Link className="navbar-brand" to="/">主界面</Link>
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-toggle="collapse"
                    data-target="#mobile-nav"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="mobile-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/profiles">开发者</Link>
                        </li>
                    </ul>
                    {isAuthenticated ? authLink : guestLink}
                    
                </div>
            </div>
        </nav>
      </div>
    )
  }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
}

//将状态映射为属性
const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, { logoutUser, clearCurrentProfile })(Navbar);
