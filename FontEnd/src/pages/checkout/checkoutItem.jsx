import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import './checkout.css';

class CheckoutItem extends Component {
    state = {}
    render() {
        var { checkoutItem } = this.props;
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        return (
            <div class="card borderCardPriceChild ">
                <div class="card-body ">
                    <div class="row">
                        <div className="col-8">
                            <span>
                                {checkoutItem.quantity} x <div>{checkoutItem.product.name}</div>
                            </span>
                        </div>
                        <div className="col-4 alignmentRightPrice">
                            {checkoutItem.product.promotion === null?
                            <span className="redHightlightPriceCardTotal">
                                {formatter.format(checkoutItem.product.sellPrice)}
                            </span>:
                            <span className="redHightlightPriceCardTotal">
                            {formatter.format(parseFloat(checkoutItem.product.sellPrice)-parseFloat(checkoutItem.product.promotion))}
                            </span>
                            }
                        </div>
                    </div>
                </div>
                <h4><hr /></h4>
            </div>
        );
    }
}

export default CheckoutItem;
