import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './user.scss';
import CommonUtils from '../../../utils/CommonUtils';
import { getAllDatmoi, deleteDatmoi } from '../../../services/datmoi'; // Adjust the import path as necessary
import { isEmpty } from 'lodash';


class Nhansu extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            isShowSearch: false,
            keyword: '',
            datmoi: [] // Initialize with an empty array
        }
    }
    async componentDidMount () {
        // Fetch all "dắt mối" when the component mounts
        await this.getalldatmoi('');
    }

    // get all "dắt mối"
    getalldatmoi = async (keyword) => {
        let res = await getAllDatmoi(keyword);
        if (res && res.errCode === 0) {
            this.setState({
                datmoi: res.data 
            });
        } else {
            this.setState({
                datmoi: [] // Reset to empty array on error
            });
        }
    }

    // handle remove keyword
    handleRemoveKeyword = async () => {
        this.setState({
            keyword: ''
        });
        await this.getalldatmoi(''); // Fetch all "dắt mối" without keyword
    }

    showSearch = async () => {
        this.setState({
            isShowSearch: !this.state.isShowSearch,
            keyword: '' // Reset keyword when showing search
        })
        await this.getalldatmoi(''); // Fetch all "dắt mối" without keyword
    }

    // link to ...
    gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    //delete "dắt mối"
    handleDeleteCustomer = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
            let res = await deleteDatmoi(id);
            if (res && res.errCode === 0) {
                await this.getalldatmoi(); // Refresh the list after deletion
                alert("Xóa sỉ dắt mối thành công");
            } else {
                alert("Xóa sỉ dắt mối thất bại");
            }
        }
    }

    handleInputChange = async(event) => {
        let value = event.target.value;
        this.setState({
            keyword: value
        });

        await this.getalldatmoi(value);
    }
    

    render() {
        const { isShowSearch, keyword , datmoi} = this.state;
        return (
           <div className='aba-container'>
                <div className='aba-content'>
                    <div className='navi ' style={{border: 'none'}}>
                        <span className='navi-left'>
                            <i onClick={() => this.gotolink('nguoidung')} className="fa-solid fa-arrow-left"></i>
                            <span>nhân sự</span>
                        </span>
                        <div className='navi-search'>
                            {this.state.isShowSearch &&
                                <input type='text' name='keyword'
                                value={this.state.keyword}
                                onChange={this.handleInputChange}
                                placeholder='Tìm kiếm ...' />
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
                            {datmoi && !isEmpty(datmoi) && 
                                datmoi.map((item, index) => {
                                    return (
                                        <li className='khachhang-item' key={index}>
                                            <span>{CommonUtils.inHoaChuoi(item.name)} {" _ "} {CommonUtils.formatPhoneNumber(item.phone)}</span>
                                            <i onClick={() => this.handleDeleteCustomer(item.id)} className="fa-solid fa-trash"></i>
                                        </li>
                                    )
                                })
                            }
                    </div>

                </div>

                <div className='aba-add'>
                        <i class="fa fa-plus"></i>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nhansu));
