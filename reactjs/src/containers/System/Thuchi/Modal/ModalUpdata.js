import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import CommonUtils from '../../../../utils/CommonUtils';
import { updateThuchi} from '../../../../services/thuchi';

class ModalUpdate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ngay: '',
            content: '',
            money: '',
            ngayhientai : '',
            inputmoney: '',
        };
    }

    async componentDidMount() {
        this.setState({
            money: this.props.item.money,
            inputmoney: this.formatNegativeMoney(this.props.item.money),
            content: this.props.item.content,
            ngayhientai: this.props.item.ngay,
            ngay: CommonUtils.formatNgay(this.props.item.ngay)
        })
    }


    // định dạng ngày với năm
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

    // định dạng tiền âm
    formatNegativeMoney(num) {
    // Chuyển num sang chuỗi, bỏ toàn bộ dấu cách
        let cleanStr = String(num).replace(/\s+/g, '');

        // Ép kiểu về số
        let n = Number(cleanStr);

        // Nếu không phải số thì trả lại giá trị gốc (để người dùng gõ dở không bị NaN)
        if (isNaN(n)) return num;

        // Lấy giá trị tuyệt đối và thêm dấu cách tách 3 số
        let absValue = Math.abs(n)
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, " ");

        return n < 0 ? `- ${absValue}` : absValue;
    }

    // Xử lý thay đổi input
    handleChangeInput = (event, type) => {
        const { name, value } = event.target;
        if (type === 'ngay') {
            this.setState({
                ngayhientai: this.formatNgayWithYear(value)
            })
        }
        if (type === 'money') {
            let formattedValue = this.formatNegativeMoney(value);
                this.setState({ inputmoney: formattedValue });
        }

        this.setState({
            [name]: value
        });
    };

    // Kiểm tra giá trị nhập vào
    checkValue = () => {
        let { ngayhientai, content, money } = this.state;

        if (!ngayhientai || ngayhientai.toString().trim() === "") {
            window.confirm("bạn quên nhập ngày");
            return false;
        }

        if (!content || content.toString().trim() === "") {
            window.confirm("bạn quên nhập nôi dung thu chi");
            return false;
        }

        if (!money || money.toString().trim() === "") {
            window.confirm("bạn quên nhập số tiền");
            return false;
        }
        return true;
    };

    // add thu chi
    handleupthuchi = async () => {
        if(this.checkValue()) {
            window.confirm("bạn có chắc muốn câp nhật thu chi này không?");
            let id = this.props.item.id
            let res = await updateThuchi(id ,{
                ngay: this.state.ngayhientai,
                content: this.state.content,
                money: this.state.money,
                type: (this.props.type || "").toUpperCase(),
            });

            if (res && res.errCode === 0) {
                this.props.onmodleupdate();
                await this.props.getthuchithang(this.props.type, 
                    this.props.month, this.props.year);
                this.setState({
                    ngay: '',
                    content: '',
                    money: '',
                    inputmoney: '',
                });
            } else {
                window.confirm("thêm thất bại");
            }
        }
    }


    render() {
        return (
            <div className='modal'>
                <div className='modal-content'>
                    <div className='header'>CẬP NHẬT THU CHI</div>
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
                            value={this.state.inputmoney}
                            onChange={(e) => this.handleChangeInput(e, 'money')}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    this.handleupthuchi();
                                }
                            }}
                        />
                    </div>

                    {/* btn */}
                    <div className='btn-thuchi'>
                            <span onClick={this.handleupthuchi} className='them'>lưu</span>
                            <span onClick={this.props.onmodleupdate} className='huy'>hủy</span>
                    </div>
                </div>

                
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalUpdate));
