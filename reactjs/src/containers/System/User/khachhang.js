import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './user.scss';
import { getAll } from '../../../services/khachhang'; // Assuming this is the service to get all customers
import CommonUtils from '../../../utils/CommonUtils';
import { isEmpty } from 'lodash'; // Importing isEmpty from lodash to check if the list is empty

class Khachhang extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            isShowSearch: false,
            listkb: [],
            listkm: [],
        }
    }
    async componentDidMount () {
        // Fetch all customers when the component mounts
        await this.getAllCustomers();
    }

    // get all customers
    getAllCustomers = async () => {
        let res = await getAll();
        if (res && res.errCode === 0) {
            this.setState({
                listkb: res.data1,
                listkm: res.data2,
            });
            // You can set the state with the customer data if needed
        } else {
            this.setState({
                listkb: [],
                listkm: [],
            });
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
        let {listkb, listkm} = this.state;
        return (
           <div className='aba-container'>
                <div className='aba-content'>
                    <div className='navi ' style={{border: 'none'}}>
                        <span className='navi-left'>
                            <i onClick={() => this.gotolink('nguoidung')} className="fa-solid fa-arrow-left"></i>
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

                    {/* list */}
                    <div className='list-khachhang'>

                        {/* khách .. */}
                            {listkm && !isEmpty(listkm) &&
                                <div className='khachhang-header'> Khách điện thoại</div>
                            }

                            {listkm && !isEmpty(listkm) && listkm.map((item, index) => {
                                return (
                                    <li className='khachhang-item' key={index} onClick={() => this.gotolink(`khachhang/${item.id}`)}>
                                            {CommonUtils.inHoaChuoi(item.name)} {" _ "} {CommonUtils.formatPhoneNumber(item.phone)}
                                    </li>
                                )

                            }
                            )}

                            {/* khách bán */}

                            {listkb && !isEmpty(listkb) &&
                                <div className='khachhang-header'> Khách bán điện thoại</div>
                            }

                            {listkb && !isEmpty(listkb) && listkb.map((item, index) => {
                                return (
                                    <li className='khachhang-item' key={index} onClick={() => this.gotolink(`khachhang/${item.id}`)}>
                                            {CommonUtils.inHoaChuoi(item.name)} {" _ "} {CommonUtils.formatPhoneNumber(item.phone)}
                                    </li>
                                )

                            }
                            )}

                            
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
