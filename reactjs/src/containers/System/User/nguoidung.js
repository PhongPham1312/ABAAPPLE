import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './user.scss';


class Nguoidung extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            isShow: false,
        }
    }

    // link to ...
    gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }
    
    render() {
        return (
           <div className='aba-container'>
                <div className='aba-content'>
                    <div className='navi'>
                        <i onClick={() => this.gotolink('home')} className="fa-solid fa-arrow-left"></i>
                        <span>người dùng</span>
                    </div>

                    <div className='user-list'>
                        <li onClick={() => this.gotolink('nhansu')}> <i className="fa-solid fa-folder"></i>NHÂN SỰ</li>
                        <li onClick={() => this.gotolink('datmoi')}><i className="fa-solid fa-folder"></i>SỈ DẮT MỐI</li>
                        <li onClick={() => this.gotolink('khachhang')}><i className="fa-solid fa-folder"></i>KHÁCH HÀNG</li>
                    </div>
                </div>
           </div>
        );
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nguoidung));
