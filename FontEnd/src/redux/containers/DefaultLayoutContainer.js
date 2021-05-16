import React, { Component } from 'react';
import { connect } from 'react-redux';
import DefaultLayout from '../../container/defaultLayout';
import ProductService from "../../services/ProductService";
import { actOnloadProductFromApi } from '../actions';
class DefaultLayoutContainer extends Component {
    state = {  }
    componentDidMount(){
        ProductService.listProduct().then(res => {
            this.props.onLoadProductFromApi(res.data.products)
        })
    }
    render() { 
        var {user, onLoadProductFromApi, isOnUrl} = this.props
        return ( 
            <DefaultLayout
                auth = {user.auth}
                onLoadProductFromApi = {onLoadProductFromApi}
                isOnUrl = {isOnUrl}
            />
         );
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        user : state.user,
    }
}
const mapDispartToProps = (dispatch, props) => {
    return {
        onLoadProductFromApi: (product) => {
            dispatch(actOnloadProductFromApi(product));
        },

        // loadProductIsSelect: (product, id) => {
        //     dispatch(actOnLoadProductIsSelect(product, id));
        // },
    }
}

export default connect(mapStateToProps,mapDispartToProps)(DefaultLayoutContainer);