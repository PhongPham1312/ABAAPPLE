import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './user.scss';
import CommonUtils from '../../../utils/CommonUtils';
import { getAllUsers } from '../../../services/userService'; // Adjust the import path as necessary
import { isEmpty } from 'lodash';
import ModalNhansu from './Modal/ModalNhansu';
import Modallichlam from './Modal/Modallichlam';


class Nhansu extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            isShowSearch: false,
            keyword: '',
            listUser: [], // Initialize with an empty array
            isShowmodaladd: false,
            typeModal: '',
            openLich: false
        }
    }
    async componentDidMount () {
        // Fetch all "dắt mối" when the component mounts
        await this.getAllUser('');
    }

    // get all "dắt mối"
    getAllUser = async (keyword) => {
        let res = await getAllUsers(keyword);
        if (res && res.errCode === 0) {
            this.setState({
                listUser: res.data.data 
            });
        } else {
            this.setState({
                listUser: [] // Reset to empty array on error
            });
        }
    }

    // handle remove keyword
    handleRemoveKeyword = async () => {
        this.setState({
            keyword: ''
        });
        await this.getAllUser(''); // Fetch all "dắt mối" without keyword
    }

    showSearch = async () => {
        this.setState({
            isShowSearch: !this.state.isShowSearch,
            keyword: '' // Reset keyword when showing search
        })
        await this.getAllUser(''); // Fetch all "dắt mối" without keyword
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
    /* handleDeleteCustomer = async (id) => {
        if (window.confirm("Bạn có chắc chắn muốn xóa khách hàng này?")) {
            let res = await deleteDatmoi(id);
            if (res && res.errCode === 0) {
                await this.getalldatmoi(); // Refresh the list after deletion
                alert("Xóa sỉ dắt mối thành công");
            } else {
                alert("Xóa sỉ dắt mối thất bại");
            }
        }
    } */

    handleInputChange = async(event) => {
        let value = event.target.value;
        this.setState({
            keyword: value
        });

        await this.getAllUser(value);
    }
    
    openModalAdd = (type, id) => {
        this.setState({
            isShowmodaladd: true,
            typeModal: type,
            userid: id
        });
    }

    closeModalAdd = () => {
        this.setState({
            isShowmodaladd: false,
            typeModal: ''
        });
    }

    openLenlich = ()  =>{
        this.setState({
            openLich: !this.state.openLich
        })
    }

    render() {
        const { listUser, isShowmodaladd, openLich} = this.state;
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
                                    <i onClick={this.handleRemoveKeyword} className="fa-solid fa-xmark"></i>
                                    <span onClick={this.showSearch}> hủy</span>
                                </span>
                                
                            }
                        </div>
                    </div>

                    {/* list */}
                    <div className='list-khachhang'>
                            {listUser && !isEmpty(listUser) && 
                                listUser.map((item, index) => {
                                    return (
                                        <li className='khachhang-item' key={index} onClick={() => this.openModalAdd('edit', item.id)}>
                                            <span>
                                                <span>{CommonUtils.vietTatChucVu(item.positionData.chucvu)}
                                                {' _ '}{CommonUtils.inHoaChuoi(item.name)} {" _ "} 
                                                {CommonUtils.formatPhoneNumber(item.phone)}</span>
                                            </span>
                                        </li>
                                    )
                                })
                            }
                    </div>

                    {isShowmodaladd === true && 
                        <ModalNhansu 
                            closeModalAdd={this.closeModalAdd}
                            getAllUser = {this.getAllUser}
                            typeModal={this.state.typeModal}
                            userid = {this.state.userid}
                        />
                    }


                    {openLich === true && 
                        <Modallichlam 
                            openLenlich = {this.openLenlich}
                        />
                    }

                </div>

                <div onClick={this.openLenlich} className='aba-add calendar'>
                        <i className="fa-solid fa-calendar-days"></i>
                </div>

                <div onClick={() => this.openModalAdd('add', '')} className='aba-add'>
                        <i className="fa fa-plus"></i>
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
