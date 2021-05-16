import React, { Component } from 'react';
import { connect } from 'react-redux';
import { actAddProductSizeInImport, actAddProductToImport, actDeleteProductInImport, actDeleteProductSizeInImport } from '../actions/ActionImport';
import ImportGood from '../../views/shop/importGood/importGood'
class ImportGoodContainer extends Component {
    render() {
        var { onAddProductToImport, onAddSizeToImport, onDeleteProductInImport, onDeleteProductSizeInImport } = this.props      //các props hàm xử lý redux
        var { products } = this.props.stateImportProductGood
        var { productSizes } = this.props.stateImportProductGood
        return (
            <ImportGood
                onAddProductToImport = {onAddProductToImport}
                onAddSizeToImport = {onAddSizeToImport}
                products = {products}
                productSizes = { productSizes}
                onDeleteProductInImport = { onDeleteProductInImport }
                onDeleteProductSizeInImport = {onDeleteProductSizeInImport}
            />
        );
    }
}
const mapStateToProps = (state) => {
    return {
        stateImportProductGood : state.stateImportProductGood
    }
}
const mapDispatchToProps = (dispatch, props) => {
    return {
        onAddProductToImport: (product, idProductOnApi) => {
            dispatch(actAddProductToImport(product, idProductOnApi));
        },
        onAddSizeToImport: (productSize) =>{
            dispatch(actAddProductSizeInImport(productSize))
        },
        onDeleteProductInImport: (idProduct) =>{
            dispatch(actDeleteProductInImport(idProduct))
        }, 
        onDeleteProductSizeInImport: (indexProductSize) =>{
            dispatch(actDeleteProductSizeInImport(indexProductSize))
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ImportGoodContainer);