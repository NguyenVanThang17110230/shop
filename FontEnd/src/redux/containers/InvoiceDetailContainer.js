import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import InvoiceDetail from '../../pages/invoiceDetail/invoiceDetail'
class InvoiceDetailContainer extends Component {
    state = {  }
    render() { 
        var { idOnUrl, urlBackend } = this.props
        var { orders } = this.props.invoiceDetail
        return ( 
            <InvoiceDetail
                orders = {orders}
                idOnUrl = {idOnUrl}
                idOrderOnRedux = {this.showInvoiceDetail()}
                urlBackend = { urlBackend.urlBackend }
            />
        );
    }
    showInvoiceDetail = () =>{
        var { invoiceDetail, idOnUrl } = this.props
        for(var i = 0; i< invoiceDetail.orders.length; i++){
            if(invoiceDetail.orders[i].id === parseInt(idOnUrl)){
                return i;  
            }
        }
        return;
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        cart: state.cart,
        user: state.user,
        wishLists: state.wishLists,
        invoiceDetail: state.invoiceDetail,
        idOnUrl: ownProps.match.params.orderDetailId,
        urlBackend: state.urlBackend,
    }
}
const mapDispartToProps = (dispatch, props) => {
    return {
        // onUserLogout: () => {
        //     dispatch(actLogoutByUser());
        // }
    }
}
export default connect(mapStateToProps, mapDispartToProps)(InvoiceDetailContainer);