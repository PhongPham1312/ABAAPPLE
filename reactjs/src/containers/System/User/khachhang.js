import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './user.scss';
import { getAll,  searchUsers, deleteKhachHang } from '../../../services/khachhang'; // Assuming this is the service to get all customers
import CommonUtils from '../../../utils/CommonUtils';
import { isEmpty } from 'lodash'; // Importing isEmpty from lodash to check if the list is empty

class Khachhang extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            isShowSearch: false,
            listkb: [],
            listkm: [],
            keyword: '',
        }
    }
    async componentDidMount () {
        // Fetch all customers when the component mounts
        await this.getAllCustomers();
    }

    // handle delete customer
    handleDeleteCustomer = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
            let res = await deleteKhachHang(id);
            if (res && res.errCode === 0) {
                await this.getAllCustomers(); // Refresh the list after deletion
                alert("Xóa khách hàng thành công");
            } else {
                alert("Xóa khách hàng thất bại");
            }
        }
    }

    // search customers
    searchCustomers = async () => {
        let { keyword } = this.state;
        if (keyword) {
            let res = await searchUsers(keyword);
            if (res && res.errCode === 0) {
                this.setState({
                    listkb: res.data1,
                    listkm: res.data2,
                });
            } 
        } 
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

    showSearch = async () => {
        this.setState({
            isShowSearch: !this.state.isShowSearch,
            keyword: '' // Reset keyword when showing search
        })
        await this.getAllCustomers(); // Reset to all customers when showing search
    }

    // handle search input change
    handleInputChange = async(event) => {
        let value = event.target.value;
        this.setState({
            keyword: value
        });

        // check null
        if (value) {
           await this.searchCustomers();
        } else {
           await this.getAllCustomers(); // Reset to all customers if input is empty
        }
    }
    
    // handle remove keyword
    handleRemoveKeyword = async () => {
        this.setState({
            keyword: ''
        });
        await this.getAllCustomers(); // Reset to all customers when removing keyword
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
                                <input type='text' name='keyword'
                                value={this.state.keyword}
                                onChange={this.handleInputChange}
                                placeholder='Tìm kiếm khách hàng...' />
                            }
                            {
                                this.state.isShowSearch  === false ?
                                <i onClick={this.showSearch} className="fa-solid fa-magnifying-glass"></i> : 
                                <span className='navi-search-close'>
                                    <i onClick={this.handleRemoveKeyword} class="fa-solid fa-xmark"></i>
                                    <span onClick={this.showSearch}> hủy</span>
                                </span>
                                
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
                                            <span>{CommonUtils.inHoaChuoi(item.name)} {" _ "} {CommonUtils.formatPhoneNumber(item.phone)}</span>
                                            <i onClick={() => this.handleDeleteCustomer(item.id)} className="fa-solid fa-trash"></i>
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
                                            <span>{CommonUtils.inHoaChuoi(item.name)} {" _ "} {CommonUtils.formatPhoneNumber(item.phone)}</span>
                                            <i onClick={() => this.handleDeleteCustomer(item.id)} className="fa-solid fa-trash"></i>
                                                
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
