import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import './Header.scss';
// assets logo
import logo from "../../assets/logo.jpg"
import { withRouter } from 'react-router-dom';


class Header extends Component {

    gotolink = (link) => {
        if (this.props.history) {
            this.props.history.push(`/system/${link}`);
        }
    };

    render() {
        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* logo */}
                <div onClick={() => this.gotolink('home')} className='logo'>
                    <img  src={logo}/>
                </div>

                {/*  */}

                {/* nút logout */}
                <div className='header-content'>
                    <div className='info'>
                        <i class="fa-solid fa-bell"></i>
                    </div>
                    <div className='info'>
                        <i class="fa-solid fa-circle-question"></i>
                    </div>
                    <div className='info'>
                        <i class="fa-solid fa-circle-user"></i>
                        <ul className='info-list'>
                            <li className='info-item info-user'><i class="fa-solid fa-user"></i> người dùng</li>
                            <li className='info-item info-out' onClick={processLogout}><i className="fas fa-sign-out-alt"></i> đăng xuất</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Header));
