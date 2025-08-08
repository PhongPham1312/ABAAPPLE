import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './SystemScss.scss';
import CommonUtils from '../../utils/CommonUtils';
import { withRouter } from 'react-router';


class Home extends Component {

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

                    {/* navi dieu huong */}
                    <div className='navi'>

                        {CommonUtils.isSubstring(this.props.match.path, 'home') === false && 
                            <i class="fa-solid fa-arrow-left"></i>
                        }
                        <i class="fa-solid fa-house"></i>
                        <span>trang chủ</span>
                    </div>

                    {/* content */}
                    <div className='aba-content-item'>
                        <li onClick={() => this.gotolink('nguoidung')} className='item-li'><i class="fa-solid fa-folder"></i> NGƯỜI DÙNG</li>
                        <li onClick={() => this.gotolink('thuchi-manage')} className='item-li'><i class="fa-solid fa-folder"></i> THU CHI</li>
                        <li className='item-li'><i class="fa-solid fa-folder"></i> KHO HÀNG</li>
                        <li className='item-li'><i class="fa-solid fa-folder"></i> CÔNG VIỆC</li>
                    </div>

                    
                </div>

                {/* button add */}
                {CommonUtils.isSubstring(this.props.match.path, 'home') === false && 
                    <div className='aba-add'>
                        <i class="fa fa-plus"></i>
                    </div>
                }
                    
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home));
