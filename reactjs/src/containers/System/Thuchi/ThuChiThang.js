import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Thuchi.scss';
import CommonUtils from '../../../utils/CommonUtils';
import { getThuchi, deleteThuchi } from '../../../services/thuchi';
import { isEmpty } from 'lodash';
import ModalAdd from './Modal/ModalAdd';
import ModalUpdata from './Modal/ModalUpdata';

class ThuchiThang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thang: '',
            type: '',
            namethang: '',
            thuchitheongay: {},
            isModaladd: false,
            modalupdate: false,
            itemupdate: {}
        };
    }

    async componentDidMount() {
        const thang = this.props.match?.params?.mount;
        const nam = this.props.match?.params?.year;
        const type = this.props.match?.params?.type;
        this.kiemtratype()

        this.setState({ thang, type });
        await this.getthuchithang(type, thang, nam);
    }

    kiemtratype  = () => {
        if(this.props.match?.params?.type === 'as') this.setState({namethang: `THU CHI AS ${this.props.match?.params?.mount}`, nametong: "TỔNG AS"})
        else if(this.props.match?.params?.type === 'tm') this.setState({namethang: `THU CHI TM ${this.props.match?.params?.mount}`, nametong: "TỔNG TM"})
    }

    // getthuchi
    getthuchithang = async (type, month, year) => {
        let res = await getThuchi(type, month, year);

        if (res?.errCode === 0 && Array.isArray(res.data)) {
            const data = res.data;

            const grouped = data.reduce((result, item) => {
                const key = item.ngay;
                if (!result[key]) {
                    result[key] = [];
                }
                result[key].push(item);
                return result;
            }, {});

            this.setState({
                thuchitheongay: grouped
            });

        } else {
            this.setState({ thuchitheongay: {} });
        }
    }

    openModalAdd = () => {
        this.setState({
            isModaladd: !this.state.isModaladd,
        })
    }

    // delete thu chi
    handledeletethuchi = async (id) => {
        if (window.confirm("bạn có chắc muốn xóa thu chi này không?")) {
            // Call API to delete thu chi           
            let res = await deleteThuchi(id);
            if (res && res.errCode === 0) { 
                await this.getthuchithang(this.state.type, this.state.thang, this.props.match?.params?.year);
            }
        }
    };

    onmodleupdate = (item) => {
        this.setState({
            itemupdate: item,
            modalupdate : !this.state.modalupdate,
        });
    }

    isSaturday(ngayStr) {
        // tách theo dấu chấm
        const [day, month, year] = ngayStr.split('.').map(Number);
        const dateObj = new Date(year, month - 1, day); // month - 1 vì JS tháng bắt đầu từ 0
        return dateObj.getDay() === 6; // 6 là thứ 7
    }

    tinhTongDenNgay = (ngayStr) => {
        const { thuchitheongay } = this.state;

        // Chuyển chuỗi "9.8.2025" thành Date
        const [day, month, year] = ngayStr.split('.').map(Number);
        const targetDate = new Date(year, month - 1, day);

        let tong = 0;

        // Lọc tất cả ngày <= ngày Thứ 7 hiện tại
        Object.entries(thuchitheongay).forEach(([ngayKey, items]) => {
            const [d, m, y] = ngayKey.split('.').map(Number);
            const dateObj = new Date(y, m - 1, d);

            if (dateObj <= targetDate) {
                items.forEach(item => {
                    // Bỏ dấu cách, chuyển sang số
                    const moneyNum = Number(String(item.money || "0").replace(/\s+/g, ''));
                    tong += moneyNum;
                });
            }
        });

        return tong;
    };

    gotolink = (link) => {
        if (this.props.history) {
            this.props.history.push(`/system/${link}`);
        }
    };


    render() {
        let {thuchitheongay, isModaladd} = this.state
        return (
            <div className='aba-container'>
                <div className='aba-content'>
                    {/* thu chi header */}
                    <div className='thuchi-header'>
                        <i onClick={() => this.gotolink('thuchi-manage')} className="fa-solid fa-arrow-left"></i>
                            <span>{this.state.namethang}</span>
                    </div>

                    {/* list */}
                    <div className='list-thichuthang'>
                        <table className="table-bordered">
                            <tbody>
                                 {thuchitheongay && !isEmpty(thuchitheongay) &&
                                    Object.entries(thuchitheongay).map(([ngay, items], index, arr) => {
                                        const isSat = this.isSaturday(ngay);
                                        const isLastDay = index === arr.length - 1; // kiểm tra có phải phần tử cuối cùng không
                                        return (
                                            <React.Fragment key={index}>
                                                {/* Dòng ngày */}
                                                <tr>
                                                    <td colSpan="2" style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                                                        {CommonUtils.formatNgay(ngay)}
                                                    </td>
                                                </tr>

                                                {/* Dòng dữ liệu trong ngày đó */}
                                                {items.map((item, i) => (
                                                    <tr
                                                        key={`${index}-${i}`}
                                                        style={{ fontWeight: item.money.toString().includes('-') ? 'normal' : 'bold' }}
                                                    >
                                                        <td className='td-content'>
                                                            {item.content}
                                                            <span className='icon-edit'>
                                                                <i
                                                                    onClick={() => this.onmodleupdate(item)}
                                                                    className="fa-solid fa-pen-to-square"
                                                                ></i>
                                                                <i
                                                                    onClick={() => this.handledeletethuchi(item.id)}
                                                                    className="fa-solid fa-trash"
                                                                ></i>
                                                            </span>
                                                        </td>
                                                        <td className='td-money'>
                                                            {CommonUtils.formatMoney(
                                                                Number(String(item.money || "0").replace(/\s+/g, ''))
                                                            )}
                                                        </td>
                                                    </tr>
                                                ))}

                                                {/* Nếu là thứ 7 hoặc ngày cuối thì in tổng */}
                                                {(isSat || isLastDay) && (
                                                    <tr style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>
                                                        <td style={{ backgroundColor: '#ffe4b5' }}>
                                                            {this.state.nametong}
                                                        </td>
                                                        <td style={{ backgroundColor: '#ffe4b5', textAlign: 'right' }}>
                                                            {CommonUtils.formatMoney(this.tinhTongDenNgay(ngay))}
                                                        </td>
                                                    </tr>
                                                )}
                                            </React.Fragment>
                                        );
                                    })
                                }
                            </tbody>
                        </table>

                    </div>

                    {CommonUtils.isSubstring(this.props.match.path, 'home') === false && (
                        <div onClick={this.openModalAdd} className='aba-add'>
                            <i className="fa fa-plus"></i>
                        </div>
                    )}

                    {/* modal add */}
                    {isModaladd && 
                        <ModalAdd 
                            openModalAdd  = {this.openModalAdd}
                            getthuchithang = {this.getthuchithang}
                            type = {this.props.match?.params?.type}
                            month = {this.props.match?.params?.mount}  
                            year = {this.props.match?.params?.year}
                        />
                    }

                    {/* modal update */}
                    {this.state.modalupdate && 
                        <ModalUpdata 
                            onmodleupdate  = {this.onmodleupdate}
                            getthuchithang = {this.getthuchithang}
                            type = {this.props.match?.params?.type}
                            month = {this.props.match?.params?.mount}  
                            year = {this.props.match?.params?.year}
                            item = {this.state.itemupdate}
                        />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThuchiThang));
