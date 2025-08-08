import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './user.scss';


class Khachhang extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            isShowSearch: false,

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

    showSearch = () => {
        this.setState({
            isShowSearch: !this.state.isShowSearch
        })
    }
    
    render() {
        return (
           <div className='aba-container'>
                <div className='aba-content'>
                    <div className='navi ' style={{border: 'none'}}>
                        <span className='navi-left'>
                            <i onClick={() => this.gotolink('home')} className="fa-solid fa-arrow-left"></i>
                            <span>khách hàng</span>
                        </span>
                        <div className='navi-search'>
                            {this.state.isShowSearch &&
                                <input type='text' placeholder='Tìm kiếm khách hàng...' />
                            }
                            {
                                this.state.isShowSearch  === false ?
                                <i onClick={this.showSearch} className="fa-solid fa-magnifying-glass"></i> : 
                                <span onClick={this.showSearch}>hủy</span>
                            }
                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Khachhang));
