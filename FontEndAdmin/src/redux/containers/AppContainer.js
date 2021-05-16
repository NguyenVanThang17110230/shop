import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { actLoginByUser } from '../actions/ActionLogin';

//Import component
import App from '../../App';


class AppContainer extends Component {
    state = {  }
    render() { 
        var {user} = this.props
        
        return ( 
            <App
            auth = {user.auth}
            />
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }
}
//nếu muốn mua nhiều sản phẩm cùng lúc thì truyền số lượng vào
export default connect(mapStateToProps,null)(AppContainer);