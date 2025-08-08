import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Thuchi.scss';
import CommonUtils from '../../../utils/CommonUtils';
import { getThuchi } from '../../../services/thuchi';
import { isEmpty } from 'lodash';
import ModalAdd from './Modal/ModalAdd';

class ThuchiThang extends Component {
    constructor(props) {
        super(props);
        this.state = {
            thang: '',
            type: '',
            namethang: '',
            thuchitheongay: {},
            isModaladd: false
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
        if(this.props.match?.params?.type === 'as') this.setState({namethang: `THU CHI AS ${this.props.match?.params?.mount}`})
        else if(this.props.match?.params?.type === 'tm') this.setState({namethang: `THU CHI TM ${this.props.match?.params?.mount}`})
        else if(this.props.match?.params?.type === 'parttime') this.setState({namethang: `LƯƠNG PART TIME THÁNG ${this.props.match?.params?.mount}`})
        else if(this.props.match?.params?.type === 'fulltime') this.setState({namethang: `LƯƠNG FULL TIME THÁNG ${this.props.match?.params?.mount}`})
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
            isModaladd : !this.state.isModaladd
        })
    }


    render() {
        let {thuchitheongay, isModaladd} = this.state
        return (
            <div className='aba-container'>
                <div className='aba-content'>
                    {/* thu chi header */}
                    <div className='thuchi-header'>
                        <i className="fa-solid fa-arrow-left"></i>
                            <span>{this.state.namethang}</span>
                    </div>

                    {/* list */}
                    <div className='list-thichuthang'>
                        <table className="table-bordered">
                            <tbody>
                                 {thuchitheongay && !isEmpty(thuchitheongay) &&
                                    Object.entries(thuchitheongay).map(([ngay, items], index) => (
                                        <React.Fragment key={index}>
                                            {/* Dòng ngày */}
                                            <tr>
                                                <td colSpan="2" style={{ fontWeight: 'bold', backgroundColor: '#f0f0f0' }}>{CommonUtils.formatNgay(ngay)}</td>
                                            </tr>

                                            {/* Dòng dữ liệu trong ngày đó */}
                                            {items.map((item, i) => (
                                                <tr
                                                    key={`${index}-${i}`}
                                                    style={{ fontWeight: item.money.toString().includes('-') ? 'normal' : 'bold' }}
                                                >
                                                    <td>{item.content}</td>
                                                    <td className='td-money'>{CommonUtils.formatMoney(item.money)}</td>
                                                </tr>
                                            ))}
                                        </React.Fragment>
                                    ))
                                }
                            </tbody>
                        </table>

                    </div>

                    {CommonUtils.isSubstring(this.props.match.path, 'home') === false && (
                        <div onClick={this.openModalAdd} className='aba-add'>
                            <i className="fa fa-plus"></i>
                        </div>
                    )}

                </div>
                    {/* modal add */}
                    {isModaladd && 
                        <ModalAdd 
                            openModalAdd  = {this.openModalAdd}
                        />
                    }
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ThuchiThang));
