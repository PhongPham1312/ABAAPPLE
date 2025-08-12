import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CommonUtils from '../../../../utils/CommonUtils';
import '../user.scss';
import {getAll } from '../../../../services/position'; // Adjust the import path as necessary
import Select from 'react-select'; // Assuming you are using react-select for dropdowns
class ModalNhansu extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            listPosition: [],
            selectedPosition: '',
            imageBack: '',
            imageFont: '',
            email: '',
        }
    }
    async componentDidMount () {
        await this.getallposition();
    }

    // get all positions
    getallposition = async () => {
        let res = await getAll();
        if (res && res.errCode === 0) {
            let options = res.data.map(item => ({
                label: item.chucvu,
                value: item.id,
                money: item.money
            }));

            this.setState({
                listPosition: options
            });
        } else {
            this.setState({
                listPosition: []
            });
        }
    }

    handleOnChangeInput = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    };


    handlePositionChange = (selectedOption) => {
        this.setState({
            selectedPosition: selectedOption,
            money: selectedOption.money || '' // Nếu API trả kèm lương thì lấy ra
        });
    }

    handleOnchangeImage = (e, type) => {
        let file = e.target.files[0];
        if (file) {
            let reader = new FileReader();
            reader.onload = () => {
                if (type === 'front') {
                    this.setState({ imageFont: reader.result });
                } else if (type === 'back') {
                    this.setState({ imageBack: reader.result });
                }
            };
            reader.readAsDataURL(file); // chuyển file thành base64 để hiển thị
        }
    }

    checkValidInput = () => {
        // name
        if(this.state.name && this.state.name.trim() === '') {
            window.confirm('Tên không được để trống');
            return false;
        }
        // phone
        if(this.state.phone && this.state.phone.trim() === '') {
            window.confirm('Số điện thoại không được để trống');
            return false;
        }

        // money
        if(this.state.money && this.state.money.trim() === '') {
            window.confirm('Lương không được để trống');
            return false;
        }
        return true;
    }

    // handle add or update
    handleadd = async () => {
        if (!this.checkValidInput()) return;
        
        console.log('state', this.state);
    }
   
    render() {
        return (
           <div className='ModalNhansu'>
                <div className='ModalNhansu-container'>

                    <div className='ModalNhansu-header'>
                        {this.props.typeModal === "add" ? 'Thêm nhân sự' : 'Cập nhật nhân sự'}

                    </div>

                    {/* form infor */}
                    <div className='form-info'>
                        <div className='form-group'>
                            <label>email</label>
                            <input type='email'
                            name='email'
                            value={this.state.email} 
                            onChange={this.handleOnChangeInput}
                             className='form-control' />
                        </div>
                    </div>
                    <div className='form-info'>
                        <div className='form-group'>
                            <label>tên</label>
                            <input type='text'
                            name='name'
                            value={this.state.name}
                            onChange={this.handleOnChangeInput}
                             className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label>điện thoại</label>
                            <input type='text'
                            name='phone'
                            value={this.state.phone}
                             className='form-control' />
                        </div>
                    </div>
                    <div className='form-info'>
                        <div className='form-group'>
                            <label>vị trí</label>
                            <Select
                                value={this.state.selectedPosition}
                                onChange={this.handlePositionChange}
                                options={this.state.listPosition}
                                placeholder='Chọn vị trí'
                            />
                        </div>
                        <div className='form-group'>
                            <label>lương</label>
                            <input type='text'
                            onChange={this.handleOnChangeInput}
                            name='money'
                            value={CommonUtils.formatMoney(this.state.money)}
                             className='form-control' />
                        </div>
                    </div>

                    <div className='form-info'>
                        <div className='form-group'>
                            <label htmlFor="front">ảnh CCCD mặt trước <i className="fa-solid fa-upload"></i></label>
                            <input type='file'
                                name='front'
                                id='front'
                                onChange={(e) => this.handleOnchangeImage(e, 'front')}
                                className='form-control-file' hidden  />
                                {this.state.imageFont &&
                                    <div className='image'>
                                        {this.state.imageFont && <img src={this.state.imageFont} alt='anh' />}
                                    </div>
                                }
                        </div>
                    </div>

                    <div className='form-info'>
                        <div className='form-group'>
                            <label htmlFor="back">ảnh CCCD mặt sau<i className="fa-solid fa-upload"></i></label>
                            <input type='file'
                                name='back'
                                id='back'
                                 onChange={(e) => this.handleOnchangeImage(e, 'back')}
                                className='form-control-file' hidden />
                            {this.state.imageBack &&
                                <div className='image'>
                                    {this.state.imageBack && <img src={this.state.imageBack} alt='anh' />}
                                </div>
                            }
                        </div>
                    </div>
                    

                    {/* btn */}

                    <div className='ModalNhansu-btn'>
                        <button onClick={this.handleadd}
                            className='btn btn-primary' >{this.props.typeModal === "add" ? 'thêm' : 'lưu'}</button>
                        <button onClick={this.props.closeModalAdd} className='btn btn-sacondary' >hủy</button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalNhansu));
