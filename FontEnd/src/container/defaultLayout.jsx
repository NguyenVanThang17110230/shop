import React, { Component } from "react";
import HeaderContainer from '../redux/containers/HeaderContainer';
import Footer from "./footer";
import { Route, Switch, withRouter } from "react-router-dom";
import PrivateRoutes from "../Routes/privateRoutes";
import PublicRoutes from "../Routes/publicRoutes";
import Cookies from "js-cookie";
import ProductService from "../services/ProductService";
class DefaultLayout extends Component {
    state = {};
    componentDidMount() {
        ProductService.listProduct().then(res => {
            this.props.onLoadProductFromApi(res.data.products)
        })
        console.log(this.props.location.pathname)
    }
    render() {
        return (
            <div>
                {this.props.location.pathname !=='/login'? this.props.location.pathname !== '/404' ?
                    <HeaderContainer /> : null : null
                }
                {Cookies.get('expireAuth') === undefined ?
                    <Switch>
                        {PublicRoutes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    auth={route.auth}
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    component={route.component} />
                            ) : null;
                        })}
                    </Switch> :
                    <Switch>
                        {PrivateRoutes.map((route, idx) => {
                            return route.component ? (
                                <Route
                                    auth={route.auth}
                                    key={idx}
                                    path={route.path}
                                    exact={route.exact}
                                    name={route.name}
                                    component={route.component}
                                />
                            ) : null;
                        })}
                    </Switch>
                }
                {this.props.location.pathname !== '/login' ? this.props.location.pathname !== '/404' ?
                    <Footer /> : null : null
                }
            </div>
        );
    }
}
export default withRouter(DefaultLayout);