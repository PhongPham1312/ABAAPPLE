import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CommonUtils from '../../../../utils/CommonUtils';
import '../user.scss';
import {getAll } from '../../../../services/position'; // Adjust the import path as necessary
import {createUser, getUserById} from '../../../../services/userService';
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
            name:"",
            phone: "",
            money: "",
            type: '0',
            navinhansu: false
        }
    }
    async componentDidMount () {
        await this.getallposition();
        if(this.props.typeModal === 'edit'){
            await this.getuser()
        }
    }

    getPositionInfo(listPosition, positionId) {
        return listPosition.find(item => +item.value === +positionId) || null;
    }

    getuser = async () => {
        let res = await getUserById(this.props.userid)
        if(res && res.errCode === 0){
            const posInfo = this.getPositionInfo(this.state.listPosition, res.data.data.position);
            this.setState({
                name: res.data.data.name,
                phone: res.data.data.phone,
                email: res.data.data.email,
                money: res.data.data.money,
                selectedPosition: posInfo ? { label: posInfo.label, value: posInfo.value } : null,
                type: res.data.data.type
            })
        }
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

        this.checkselect(selectedOption)
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
        if (!this.state.name || this.state.name.trim() === '') {
            window.confirm('Tên không được để trống');
            return false;
        }

        // phone
        if (!this.state.phone || this.state.phone.trim() === '') {
            window.confirm('Số điện thoại không được để trống');
            return false;
        }

        // money
        if (!this.state.money || this.state.money.trim() === '') {
            window.confirm('Lương không được để trống');
            return false;
        }

        return true;

    }

    checkselect = (selectedOption) => {
        if(selectedOption.label === 'part time' || selectedOption.label === 'full time'){
            this.setState({
                type: '1'})
            }
            
    }

    // handle add or update
    handleadd = async () => {
        if (this.checkValidInput() === false) return;
        let res = await createUser({
            email: this.state.email,
            name: CommonUtils.inHoaChuoi(this.state.name),
            phone: CommonUtils.formatPhone(this.state.phone),
            position: this.state.selectedPosition.value,
            money: this.state.money,
            imageBack: this.state.imageBack,
            imageFont: this.state.imageFont,
            type: this.state.type,
            password: `${CommonUtils.boDau(CommonUtils.inHoaChuoi(this.state.name))}${CommonUtils.formatPhone(this.state.phone)}`,
        })

        if(res && res.errCode === 0){
            console.log(res)
            this.props.closeModalAdd()
            await this.props.getAllUser('')
            alert(res.message.message)
        }
        else 
            alert("thêm nhân sự mới không thành công")

    }


    navi = () => {
        this.setState({
            navinhansu : !this.state.navinhansu
        })
    }


   
    render() {
        return (
           <div className='ModalNhansu'>
                <div className='ModalNhansu-container'>
                    <div onClick={this.props.closeModalAdd} className='close'><i class="fa-solid fa-xmark"></i></div>
                    <div className='ModalNhansu-header'>
                        {this.props.typeModal === "add" ? 'Thêm nhân sự' : 'Nhân sự'}

                    </div>

                    {this.props.typeModal === 'edit' && 
                        <div className='navi-nhansu'>
                            <div onClick={this.navi} className={this.state.navinhansu === false ? 'nhansu-item' : ''}>bảng lương</div>
                            <div onClick={this.navi} className={this.state.navinhansu === true ? 'nhansu-item' : ''}>thông tin</div>
                        </div>
                    }

                    {/* form infor */}
                    {(this.props.typeModal === 'add' || (this.props.typeModal === 'edit' && this.state.navinhansu === true)) && 
                        (
                           <>
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
                                    onChange={this.handleOnChangeInput}
                                    name='phone'
                                    value={CommonUtils.formatPhoneNumber(this.state.phone)}

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
                                    <label>lương / 1 giờ</label>
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
                            </div>
                           </>
                        )
                    }


                    {/* bảng lương */}
                    {(this.props.typeModal === 'edit' && this.state.navinhansu === false) && 
                        (
                            <>
                                <div className='bangluong-info'>
                                    {this.state.type === "1" && <span className='thuviec'>đang thử việc</span>}

                                    <span>- lương <span style={{fontWeight: "bold"}}>{this.state.money && CommonUtils.formatMoney(this.state.money)}</span> / 1 giờ x ca 4 giờ = <span style={{fontWeight: "bold"}}>{CommonUtils.formatMoney(CommonUtils.nhan2so(this.state.money, 4))}</span></span>

                                    {/* tbale */}
                                    <table className="table table-striped table-bordered">
                                        <tbody>
                                            <tr>
                                                <td>T2 _ 11.8 _ </td>
                                                <td>...</td>
                                            </tr>
                                            <tr>
                                                <td>T2 _ 11.8 _ </td>
                                                <td>...</td>
                                            </tr>
                                            <tr>
                                                <td>T2 _ 11.8 _ </td>
                                                <td>...</td>
                                            </tr>
                                            <tr>
                                                <td>T2 _ 11.8 _ </td>
                                                <td>...</td>
                                            </tr>
                                            <tr>
                                                <td>T2 _ 11.8 _ </td>
                                                <td>...</td>
                                            </tr>
                                            <tr>
                                                <td>T2 _ 11.8 _ </td>
                                                <td>...</td>
                                            </tr>
                                            <tr>
                                                <td>T2 _ 11.8 _ </td>
                                                <td>...</td>
                                            </tr>
                                        </tbody>
                                        </table>
                                </div>
                            </>
                        )
                    }



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
