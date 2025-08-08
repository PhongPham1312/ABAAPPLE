import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import Home from '../containers/System/Home';
import UserManage from '../containers/System/UserManage';
import Thuchi from '../containers/System/Thuchi/Thuchi';
import ThuChiThang from '../containers/System/Thuchi/ThuChiThang';

class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    <Switch>
                        <Route path="/system/home" component={Home} />
                        {/* <Route path="/system/user-manage" component={UserManage} /> */}
                        {/* thu chi */}
                        <Route path="/system/thuchi-manage" component={Thuchi} />
                        <Route path="/system/thuchi/:type/:mount/:year" component={ThuChiThang} />

                        <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
