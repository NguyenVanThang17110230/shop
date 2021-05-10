import React, { Component } from 'react';
import "../wishList/wishList.css";
class WishList extends Component {
    state = {}
    componentDidMount=()=>{
    }
    render() {
        return (
            <div>
                <div class="slider-area ">
                    <div class="single-slider slider-height2 d-flex align-items-center data-background-productlist">
                        <div class="container">
                            <div class="row">
                                <div class="col-xl-12">
                                    <div class="hero-cap text-center">
                                        <h2>Wish List</h2>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container containerMarginTop containerMarginBottom">
                    <div className="row">
                        {this.props.showProduct}
                    </div>
                </div>
            </div>

        );
    }
}

export default WishList;