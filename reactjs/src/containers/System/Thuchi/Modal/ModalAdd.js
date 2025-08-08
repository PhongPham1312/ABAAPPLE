import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CommonUtils from '../../../../utils/CommonUtils';

class ModalAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ngay: '',
            content: '',
            money: '',
            ngayhientai : ''
        };
    }

    async componentDidMount() {
        this.setState({
            ngayhientai: CommonUtils.getCurrentDateFormatted(),
            ngay: CommonUtils.formatNgay(CommonUtils.getCurrentDateFormatted())
        })
    }

    

    gotolink = (link) => {
        if (this.props.history) {
            this.props.history.push(`/system/${link}`);
        }
    };

    formatNgayWithYear(ngay) {
        if (!ngay) return '';

        // Cắt thành mảng theo dấu .
        const parts = ngay.split('.');
        
        if (parts.length === 3) {
            // Đủ ngày, tháng, năm
            return ngay;
        } else if (parts.length === 2) {
            // Chỉ có ngày và tháng -> ghép năm hiện tại
            const currentYear = new Date().getFullYear();
            return `${parts[0]}.${parts[1]}.${currentYear}`;
        } else {
            // Không hợp lệ
            return ngay;
        }
    }

    handleChangeInput = (event, type) => {
        const { name, value } = event.target;
        if (type === 'ngay') {
            this.setState({
                ngayhientai: this.formatNgayWithYear(value)
            })
        }
        this.setState({
            [name]: value
        });
    };

    // add
    handleaddthuchi = async () => {
        console.log(this.state)
    }


    render() {
        return (
            <div className='modal'>
                <div className='modal-content'>
                    <div className='header'>THÊM THU CHI</div>
                    {/* form thoogn tin */}
                    <div className='form-thuchi'>
                        <label>ngày</label>
                        <input name='ngay' type='text'
                            value={this.state.ngay}
                            onChange={(e) => this.handleChangeInput(e ,'ngay')}
                        />
                    </div>

                    <div className='form-thuchi'>
                        <label>nội dung</label>
                        <input
                            name='content' type='text'
                            value={this.state.content}
                            onChange={this.handleChangeInput}
                        />
                    </div>

                    <div className='form-thuchi'>
                        <label>tiền</label>
                        <input
                            name='money' type='text'
                            value={this.state.money}
                            onChange={this.handleChangeInput}
                        />
                    </div>

                    {/* btn */}
                    <div className='btn-thuchi'>
                            <span onClick={this.handleaddthuchi} className='them'>thêm</span>
                            <span onClick={this.props.openModalAdd} className='huy'>hủy</span>
                    </div>
                </div>

                
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalAdd));
