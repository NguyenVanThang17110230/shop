import Home from "../pages/home/home";
import Page404 from "../pages/page404/page404";
import Register from "../pages/register/register";
import ProductList from "../pages/productList/productList";
import ProfileContainer from '../redux/containers/ProfileContainer'
import ProductContainer from "../redux/containers/ProductContainer";
import CartContainer from "../redux/containers/CartContainer.js";
import CheckoutContainer from '../redux/containers/CheckoutContainer';
import ProductDetailContainer from '../redux/containers/ProductDetailContainer';
import LoginContainer from '../redux/containers/LoginContainer';
import WishListContainer from '../redux/containers/WishListContainer';
import InvoiceDetailContainer from '../redux/containers/InvoiceDetailContainer';
const routes = [
  { path: "/", exact: true, name: "Home", component: Home },
  { path: "/home", exact: true, name: "Home", component: Home },
  { path: "/login", exact: true, name: "Login", component: LoginContainer },
  { path: "/register", exact: true, name: "Register", component: Register },
  { path: "/productList", exact: true, name: "Product List", component: ProductContainer},
  { path: "/productList/:brandName", exact: true, name: "Product List", component: ProductContainer},
  { path: "/men", exact: true, name: "Men", component: ProductList },
  { path: "/women", exact: true, name: "Women", component: ProductList },
  { path: "/boy", exact: true, name: "Boy", component: ProductList },
  { path: "/girl", exact: true, name: "Girl", component: ProductList },
  { path: "/cart", exact: true, name: "Cart", component: CartContainer },
  { path: "/wishlist", exact: true, name: "Whish List", component: WishListContainer },
  { path: "/profile", exact: true, name: "Profile", component: ProfileContainer },
  { path: "/checkout", exact: true, name: "Checkout", component: CheckoutContainer },
  { path: "/productDetail/:alias", name: "Product Detail", component: ProductDetailContainer },
  { path: "/invoiceDetail/:orderDetailId", exact: true, name: "Invoice Detail", component: InvoiceDetailContainer },
  { name: "/404", component: Page404 }
];

export default routes;
