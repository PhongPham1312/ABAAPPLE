import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './SystemScss.scss';
import CommonUtils from '../../utils/CommonUtils';
import { withRouter } from 'react-router';


class Nhansu extends Component {

    constructor(props) {
        super(props);   
        this.state = {
            isShow: false,
        }
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
                    <div className='aba-header'>
                        <span className='aba-title'>Nhân sự</span>
                        <div className='aba-add' onClick={() => this.gotolink('add-nhansu')}>
                            <i className="fas fa-plus"></i>
                        </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nhansu));
