import React, { Component } from 'react';
import { connect } from 'react-redux';
import ProductList from '../../pages/productList/productList';
import Product from '../../pages/product/product';
import ProductDetail from '../../pages/productDetail/productDetail';

//Import các props act
import { actAddToCart, actOnLoadProductIsSelect, actOnloadProductFromApi, actSelectSizeOnProduct, actSelectPagingProduct } from '../actions/index';
import { actAddProductToWishList, actDeleteProductInWishList } from '../actions/ActionWishList';
import { actDeleteFilter, actFilterBestSeller, actFilterPriceDecrease, actFilterPriceIncrease } from '../actions/ActionFilter';


class ProductsContainer extends Component {
    state = {}
    render() {
        var {
            products,
            urlBackend,
            onLoadProductFromApi,
            onFilterBestSeller,
            filterProduct,
            deleteFilter,
            onFilterPriceDecrease,
            onFilterPriceIncrease,
            nameBrandUrl,
            onSelectPagingProduct,
        } = this.props;

        return (
            <ProductList
                onLoadProductFromApi={onLoadProductFromApi}
                urlBackend={urlBackend.urlBackend}
                showProduct={this.showProduct(products.products)}
                onFilterBestSeller={onFilterBestSeller}
                products={products.products}
                productFilter={filterProduct.productFilter}     //list filter
                codeFilter={filterProduct.code}         //mã filter
                deleteFilter={deleteFilter}       //xóa filter
                onFilterPriceDecrease={onFilterPriceDecrease}           //filter giảm dần
                onFilterPriceIncrease={onFilterPriceIncrease}           //filter tăng dần
                nameBrandUrl={nameBrandUrl}
                onSelectPagingProduct={onSelectPagingProduct}
                numPageSelect={products.numPageSelect}
                filterProduct={filterProduct.productFilter}
                brands = {products.brands}
                categories = {products.categories}
                groups = {products.groups}
            />
        );
    }
    showProduct = (products) => {
        var result = null;
        var { addToCart,
            loadProductIsSelect,
            urlBackend,
            onProductIsSelect,
            onAddProductToWishList,
            onDeleteProductInWishList,
            nameBrandUrl,
            filterProduct,
        } = this.props;
        if (products.length > 0) {
            if (nameBrandUrl !== undefined) {           //lọc theo hãng, category, group
                if (filterProduct.productFilter.length > 0) {
                    result = this.props.products.listProductPaging.map((product, index) => {
                        if (product !== undefined) {
                            if (product.Brand.name === nameBrandUrl) {      //lọc theo brand
                                return <Product
                                    key={index}
                                    product={product}
                                    urlBackend={urlBackend.urlBackend}
                                    addToCart={addToCart}
                                    loadProductIsSelect={loadProductIsSelect}
                                    onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                                    sizeIsSelect={this.findIdPro(product.id)}
                                    onAddProductToWishList={onAddProductToWishList}
                                    onDeleteProductInWishList={onDeleteProductInWishList}
                                    idProductInWishList={this.findIdOnWishList(product.id)}
                                />
                            }
                            if (product.Category.name === nameBrandUrl && product !== undefined) {           //lọc theo category
                                return <Product
                                    key={index}
                                    product={product}
                                    urlBackend={urlBackend.urlBackend}
                                    addToCart={addToCart}
                                    loadProductIsSelect={loadProductIsSelect}
                                    onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                                    sizeIsSelect={this.findIdPro(product.id)}
                                    onAddProductToWishList={onAddProductToWishList}
                                    onDeleteProductInWishList={onDeleteProductInWishList}
                                    idProductInWishList={this.findIdOnWishList(product.id)}
                                />
                            }
                            if (product.Category.Group.name === nameBrandUrl && product !== undefined) {         //lọc theo group
                                return <Product
                                    key={index}
                                    product={product}
                                    urlBackend={urlBackend.urlBackend}
                                    addToCart={addToCart}
                                    loadProductIsSelect={loadProductIsSelect}
                                    onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                                    sizeIsSelect={this.findIdPro(product.id)}
                                    onAddProductToWishList={onAddProductToWishList}
                                    onDeleteProductInWishList={onDeleteProductInWishList}
                                    idProductInWishList={this.findIdOnWishList(product.id)}
                                />
                            }
                            if ('Sales' === nameBrandUrl) {         //lọc theo group
                                if (product.promotion !== null) {
                                    return <Product
                                        key={index}
                                        product={product}
                                        urlBackend={urlBackend.urlBackend}
                                        addToCart={addToCart}
                                        loadProductIsSelect={loadProductIsSelect}
                                        onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                                        sizeIsSelect={this.findIdPro(product.id)}
                                        onAddProductToWishList={onAddProductToWishList}
                                        onDeleteProductInWishList={onDeleteProductInWishList}
                                        idProductInWishList={this.findIdOnWishList(product.id)}
                                    />
                                }

                            } else return null;
                        }
                        else return null;
                    });
                }
                else {
                    result = this.props.products.listProductPaging.sort((a, b) => a.id - b.id).map((product, index) => {
                        if (product !== undefined) {
                            if (product.Brand.name === nameBrandUrl) {
                                return <Product
                                    key={index}
                                    product={product}
                                    urlBackend={urlBackend.urlBackend}
                                    addToCart={addToCart}
                                    loadProductIsSelect={loadProductIsSelect}
                                    onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                                    sizeIsSelect={this.findIdPro(product.id)}
                                    onAddProductToWishList={onAddProductToWishList}
                                    onDeleteProductInWishList={onDeleteProductInWishList}
                                    idProductInWishList={this.findIdOnWishList(product.id)}
                                />
                            }
                            if (product.Category.name === nameBrandUrl && product !== undefined) {
                                return <Product
                                    key={index}
                                    product={product}
                                    urlBackend={urlBackend.urlBackend}
                                    addToCart={addToCart}
                                    loadProductIsSelect={loadProductIsSelect}
                                    onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                                    sizeIsSelect={this.findIdPro(product.id)}
                                    onAddProductToWishList={onAddProductToWishList}
                                    onDeleteProductInWishList={onDeleteProductInWishList}
                                    idProductInWishList={this.findIdOnWishList(product.id)}
                                />
                            }
                            if (product.Category.Group.name === nameBrandUrl && product !== undefined) {
                                return <Product
                                    key={index}
                                    product={product}
                                    urlBackend={urlBackend.urlBackend}
                                    addToCart={addToCart}
                                    loadProductIsSelect={loadProductIsSelect}
                                    onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                                    sizeIsSelect={this.findIdPro(product.id)}
                                    onAddProductToWishList={onAddProductToWishList}
                                    onDeleteProductInWishList={onDeleteProductInWishList}
                                    idProductInWishList={this.findIdOnWishList(product.id)}
                                />
                            } else return null;
                        }
                        else return null;
                    });
                }
            }
            else {          //lọc theo giá tăng, giảm
                if (filterProduct.productFilter.length > 0) {
                    // result = filterProduct.productFilter.map((product, index) => {
                    result = this.props.products.listProductPaging.map((product, index) => {
                        if (product !== undefined) {
                            return <Product
                                key={index}
                                product={product}
                                urlBackend={urlBackend.urlBackend}
                                addToCart={addToCart}
                                loadProductIsSelect={loadProductIsSelect}
                                onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                                sizeIsSelect={this.findIdPro(product.id)}
                                onAddProductToWishList={onAddProductToWishList}
                                onDeleteProductInWishList={onDeleteProductInWishList}
                                idProductInWishList={this.findIdOnWishList(product.id)}
                            />
                        } else { return null }
                    });
                }
                else {
                    result = this.props.products.listProductPaging.sort((a, b) => a.id - b.id).map((product, index) => {
                        if (product !== undefined) {
                            return <Product
                                key={index}
                                product={product}
                                urlBackend={urlBackend.urlBackend}
                                addToCart={addToCart}
                                loadProductIsSelect={loadProductIsSelect}
                                onProductIsSelect={onProductIsSelect}           //Khi người dùng chọn sản phẩm
                                sizeIsSelect={this.findIdPro(product.id)}
                                onAddProductToWishList={onAddProductToWishList}
                                onDeleteProductInWishList={onDeleteProductInWishList}
                                idProductInWishList={this.findIdOnWishList(product.id)}
                            />
                        }
                        else return null
                    });
                }
            }
        }
        return result;
    }
    findIdOnWishList(id) {           //tìm để lấy id của sản phẩm tron wishList
        var { wishLists } = this.props
        if (wishLists.length > 0) {
            for (var i = 0; i < wishLists.length; i++) {
                if (wishLists[i].idProduct === id) {
                    return id;
                }
            }
            return -1;
        }
        return -1;
    }
    findIdPro = (id) => {
        var { sizeIsSelect } = this.props.sizeIsSelect
        if (sizeIsSelect.length > 0) {
            for (var i = 0; i < sizeIsSelect.length; i++) {
                if (sizeIsSelect[i].sizeProduct.productId === id) {
                    console.log(sizeIsSelect)
                    return (sizeIsSelect[i].sizeProduct.id)
                }
            }
        }
        else return
    }
    showProductDetail(index) {
        var { product, urlBackend } = this.props
        return (
            <ProductDetail
                index={index}
                urlBackend={urlBackend.urlBackend}
                product={product}
            />
        )
    }
}

// ProductsContainer.propTypes = {
//     products: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.number.isRequired,
//             name: PropTypes.string.isRequired,
//             image: PropTypes.string.isRequired,
//             description: PropTypes.string.isRequired,
//             price: PropTypes.number.isRequired,
//             inventory: PropTypes.number.isRequired,
//             color : PropTypes.string.isRequired
//         })
//     ).isRequired,
//     onChangeMessage :PropTypes.func.isRequired
// }
const mapStateToProps = (state, ownProps) => {
    return {
        products: state.products,
        urlBackend: state.urlBackend,
        sizeIsSelect: state.sizeIsSelect,
        wishLists: state.wishLists,
        nameBrandUrl: ownProps.match.params.brandName,
        filterProduct: state.filterProduct,
    }
}
//nếu muốn mua nhiều sản phẩm cùng lúc thì truyền số lượng vào
const mapDispartToProps = (dispatch, props, ownProps) => {
    return {
        addToCart: (product, sizeProduct) => {
            dispatch(actAddToCart(product, 1, product.price, sizeProduct));
        },
        loadProductIsSelect: (product, id) => {
            dispatch(actOnLoadProductIsSelect(product, id));
        },
        onLoadProductFromApi: (product) => {
            dispatch(actOnloadProductFromApi(product));
        },
        onProductIsSelect: (sizeProduct, idProduct) => {
            dispatch(actSelectSizeOnProduct(sizeProduct, idProduct))
        },
        onAddProductToWishList: (idProduct, wishLists) => {
            dispatch(actAddProductToWishList(idProduct, wishLists))
        },
        onDeleteProductInWishList: (idProduct, wishLists) => {
            dispatch(actDeleteProductInWishList(idProduct, wishLists))
        },
        onFilterBestSeller: (product) => {
            dispatch(actFilterBestSeller(product))
        },
        deleteFilter: (product) => {
            dispatch(actDeleteFilter(product))
        },
        onFilterPriceDecrease: (product) => {
            dispatch(actFilterPriceDecrease(product))
        },
        onFilterPriceIncrease: (product) => {
            dispatch(actFilterPriceIncrease(product))
        },
        onSelectPagingProduct: (products, idPaging) => {
            dispatch(actSelectPagingProduct(products, idPaging))
        }
        // onChangeMessage : (message) =>{
        //     dispatch(actChangeMessage(message));
        // }
    }
}

export default connect(mapStateToProps, mapDispartToProps)(ProductsContainer);