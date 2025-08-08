import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './Thuchi.scss';
import CommonUtils from '../../../utils/CommonUtils';
import { getthuchinamthang } from '../../../services/thuchi';

class Thuchi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isShow: false,
            isListnam: false,
            listnam: [],
            isthang: '',
            isfile: {},
            thanghientai: '',
            namhientai: ''
        };
    }

    async componentDidMount() {
        await this.getnamthang();
        this.setState({ 
            thanghientai: CommonUtils.getCurrentMonth(),
            namhientai: CommonUtils.getCurrentYear()
         });
    }

    getnamthang = async () => {
        let res = await getthuchinamthang();
        if (res && res.errCode === 0) {
            const data = res.data;
            const years = Object.keys(data);
            const yearList = years.map(year => ({
                year,
                months: data[year]
            }));
            this.setState({ listnam: yearList });
        } else {
            this.setState({ listnam: [] });
        }
    };

    gotolink = (link) => {
        if (this.props.history) {
            this.props.history.push(`/system/${link}`);
        }
    };

    openlistnam = () => {
        this.setState(prev => ({ isListnam: !prev.isListnam }));
    };

    openthang = (year) => {
        this.setState(prev => ({ isthang: prev.isthang === year ? '' : year }));
    };

    openfile = (year, month) => {
        const key = `${year}-${month}`;
        this.setState(prev => ({
            isfile: {
                ...prev.isfile,
                [key]: !prev.isfile[key]
            }
        }));
    };

    render() {
        console.log(this.state.thanghientai)
        return (
            <div className='aba-container'>
                <div className='aba-content'>
                    <div className='navi'>
                        {CommonUtils.isSubstring(this.props.match.path, 'home') === false && (
                            <i onClick={() => this.gotolink('home')} className="fa-solid fa-arrow-left"></i>
                        )}
                        <i className="fa-solid fa-coins"></i>
                        <span>thu chi</span>
                    </div>

                    <div className='aba-item'>
                        <div className='content-folder'>
                            <span>thư mục</span>
                            <i onClick={this.openlistnam} className={`fa-solid ${this.state.isListnam ? 'fa-arrow-right' : 'fa-arrow-down'}`}></i>
                        </div>

                        {this.state.isListnam && (
                            <div className='item-list'>
                                {this.state.listnam.map((item, index) => (
                                    <li key={index} className='list-item-li'>
                                        <span onClick={() => this.openthang(item.year)}>
                                            <i className="fa-solid fa-folder"></i> THU CHI NĂM {item.year}
                                        </span>

                                        {this.state.isthang === item.year && (
                                            <ul className='list-thang'>
                                                {item.months.map((thang, idx2) => (
                                                    <li key={idx2} className='list-item-li-li'>
                                                        <span onClick={() => this.openfile(item.year, thang)}>
                                                            <i className="fa-solid fa-folder"></i> THU CHI THÁNG {thang}
                                                        </span>
                                                        {this.state.isfile[`${item.year}-${thang}`] && (
                                                            <ul className='list-file'>
                                                                <li onClick={() => this.gotolink(`thuchi/tm/${this.state.thanghientai}.${item.year}`)} className='item-li-li'>
                                                                    <i className="fa-solid fa-file"></i> THU CHI TM THÁNG {thang}
                                                                </li>
                                                                <li className='item-li-li'>
                                                                    <i className="fa-solid fa-file"></i> THU CHI AS THÁNG {thang}
                                                                </li>
                                                                <li className='item-li-li'>
                                                                    <i className="fa-solid fa-file"></i> LƯƠNG PART TIME THÁNG {thang}
                                                                </li>
                                                                <li className='item-li-li'>
                                                                    <i className="fa-solid fa-file"></i> LƯƠNG FULL TIME THÁNG {thang}
                                                                </li>
                                                            </ul>
                                                        )}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </li>
                                ))}
                            </div>
                        )}

                        
                    </div>

                    <div className='aba-item'>
                        <div className='content-list-thuchi'>
                            <li onClick={() => this.gotolink(`thuchi/tm/${this.state.thanghientai}/${this.state.namhientai}`)}><i className="fa-solid fa-file"></i> THU CHI TM THÁNG {this.state.thanghientai}</li>
                            <li><i className="fa-solid fa-file"></i> THU CHI AS THÁNG {this.state.thanghientai}</li>
                            <li><i className="fa-solid fa-file"></i> LƯƠNG PART TIME THÁNG {this.state.thanghientai}</li>
                            <li><i className="fa-solid fa-file"></i> LƯƠNG FULL TIME THÁNG {this.state.thanghientai}</li>
                        </div>
                    </div>
                </div>

                {CommonUtils.isSubstring(this.props.match.path, 'home') === false && (
                    <div className='aba-add'>
                        <i className="fa fa-plus"></i>
                    </div>
                )}
            </div>
        );
    }
}

const mapStateToProps = state => ({});
const mapDispatchToProps = dispatch => ({});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Thuchi));
