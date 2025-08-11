import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import './user.scss';
import { getAllDatmoi } from '../../../services/datmoi'; // Assuming this is the service to manage "dắt mối"
class DatMoi extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            isShowSearch: false,
        }
    }
    async componentDidMount () {
        // Fetch all "dắt mối" when the component mounts
        await this.getalldatmoi('');
    }

    // get all "dắt mối"
    getalldatmoi = async (keyword) => {
        let res = await getAllDatmoi(keyword);
        console.log('res', res);
    }

    // handle remove keyword
    handleRemoveKeyword = async () => {
        this.setState({
            keyword: ''
        });
    }

    showSearch = async () => {
        this.setState({
            isShowSearch: !this.state.isShowSearch,
            keyword: '' // Reset keyword when showing search
        })
    }

    // link to ...
    gotolink = (link) =>
    {
        if ( this.props.history )
        {
            this.props.history.push( `/system/${link}` );
        }
    }

    render() {
        return (
           <div className='aba-container'>
                <div className='aba-content'>
                    <div className='navi ' style={{border: 'none'}}>
                        <span className='navi-left'>
                            <i onClick={() => this.gotolink('nguoidung')} className="fa-solid fa-arrow-left"></i>
                            <span>sỉ dắt mối</span>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DatMoi));
