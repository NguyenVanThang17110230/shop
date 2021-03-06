import React, { Component } from 'react';
import {
    Button,
    Modal,
    Form,
    Table,
    Carousel, Tabs, Tab
} from "react-bootstrap";
import {
    CBadge,
    CCard,
    CCardBody,
    CCardFooter,
    CCardHeader,
    CCol,
    CDataTable,
    CRow
} from '@coreui/react'
import { toast,ToastContainer } from 'react-toastify';
import './importGood.css'
import ProductService from "../../../services/ProductService";
import BrandService from "../../../services/BrandService";
import CategoryService from "../../../services/CategoryService";
import GroupService from "../../../services/GroupService";
import SizesService from '../../../services/SizesService';
import ImportService from "../../../services/ImportService";
class ImportGood extends Component {
    constructor(props){
        super(props);
        // this.onChangeValue = this.onChangeValue.bind(this);
        this.onChangeValueImage = this.onChangeValueImage.bind(this);
        this.onChangeValueImage2 = this.onChangeValueImage2.bind(this);
        this.state = {
            showModal: false,
            products: [],
            import: {},
            importDetails: {},
            productSize: {},
            imageList: {},
            listProduct: [],
            idProductTemp: [],
            brand: [],
            category: [],
            listImage: [],
            group: [],
            Test:[],
            editBrand: '',
            editCategory: '',
            editGroup: '',
            edit: false,
            updateDaily: '',
            tempImage: '',
            realTime: '',
            typeSize: [
                {
                    id: 1,
                    name: "US"
                },
                {
                    id: 1,
                    name: "UK"
                },
                {
                    id: 1,
                    name: "VN"
                },
            ],
            stateID: '',
            listImageToApi: [],
            showModalViewImage: false,
            showModalViewSizeProduct: false,
            getSizeBySizeType: [],
            sizes: [],
            sizeID: {},
            avatarProduct: '',
            avatarProductSaveAPI: [],
            message: false,
            listImageProductById: [],
            stateOnSizeModal: [],
            stateProductOnSizeModal: '',
            statePublisherName: [],
            image:'',
            thumbnail:'',
            importDetail:[]
        };
    }
    componentDidMount() {
        this.loadData();
    }

    loadData = () => {
        ProductService.listProduct().then((res) => {
            this.setState({ listProduct: res.data.products.sort((a, b) => a.id - b.id) });
            this.realTime();
        });
        BrandService.listBrand().then((res) => {
            this.setState({ brand: res.data.brands });
            this.realTime();
        });
        CategoryService.listCategory().then((res) => {
            this.setState({ category: res.data.categories })
            this.realTime();
        });
        GroupService.listGroup().then((res) => {
            this.setState({ group: res.data.Groups })
            this.realTime();
        })
        SizesService.listSize().then((res) => {
            this.setState({ sizes: res.data.sizes });
        });
        
       
    }
    realTime = () => {
        this.setState({ updateDaily: '1' });
    }
    InputOnChange = (event) => {
        const { name, value } = event.target;
        var newProduct = { ...this.state.products, [name]: value }
        this.setState({ products: newProduct });
        this.realTime();

    }

    saveProduct = () => {
        var { products, avatarProductSaveAPI } = this.state
        var data = new FormData();
        data.append("name", products.name);
        data.append("productCode", products.productCode);
        data.append("price", products.price);
        data.append("description", products.description);
        data.append("color", products.color);
        data.append("imagePath", avatarProductSaveAPI[0]);
        data.append("brandId", products.brandId);
        data.append("categoryId", products.categoryId);
        ProductService.createProduct(data).then(res => {
            this.firstSaveImage(res.data.products.id);
            this.firstSaveSize(res.data.products.id)
        }, function (error) {
            toast.error("L???i")
        });
    }
    firstSaveSize = (idProduct) => {
        var newSize = { ...this.state.sizeID, ['productId']: idProduct } // ... l?? clone tat ca thuoc tinh cua major c?? qua thu???c t??nh m???i, [name] l???y c??i name ???? l??n name c???a t???n t???i n???u k c?? th?? th??nh 1 c??i field m???i
        this.setState({ sizeID: newSize });
        this.realTime()
 
        this.saveSize(this.state.sizeID);
    }
    saveSize(data) {
        this.realTime()
        ProductService.createProductSize(data);
    }
    save = () => {
        var { products } = this.state
        if (products.name === undefined || products.productCode === undefined || products.price === undefined || products.description === undefined
            || products.brandId === undefined || products.color === undefined || products.categoryId === undefined) {
            toast.info("Vui l??ng nh???p ????? c??c ?? input")
        }
        else {
            this.saveProduct();
            this.loadData();
            this.setCloseModal();
        }
    }
    setShowModal = (id) => {
        if (this.props.products.length <= 0) {
            var newProduct = { ...this.state.products, ['id']: 0 } // ... l?? clone tat ca thuoc tinh cua major c?? qua thu???c t??nh m???i, [name] l???y c??i name ???? l??n name c???a t???n t???i n???u k c?? th?? th??nh 1 c??i field m???i
            this.realTime();
            this.setState({ products: newProduct });
        }
        else {
            var newProduct = { ...this.state.products, ['id']: this.props.products.length } // ... l?? clone tat ca thuoc tinh cua major c?? qua thu???c t??nh m???i, [name] l???y c??i name ???? l??n name c???a t???n t???i n???u k c?? th?? th??nh 1 c??i field m???i
            this.realTime();
            this.setState({ products: newProduct });
        }
        this.setState({ showModal: true });
    }
    setShowModalEdit = (id, brand, category) => {        ///edit s???n ph???m
        // this.setState({ ModalTitle: "Edit Instructor" });
        ProductService.getProduct(id).then(res => {
            this.setState({ products: res.data.product });
        });
        this.setState({ editBrand: brand });  // c???p nh???t brand
        this.setState({ editCategory: category });  // c???p nh???t category
        this.setState({ showModal: true });
        this.setState({ edit: true })
        this.realTime();      //realtime cho c??c state
    }
    setCloseModal = () => {
        this.setState({ showModal: false });
        this.setState({ edit: false })
        this.setState({ intermediariesMoney: '' });
        this.setState({ listImage: [] })
        this.setState({ tempImage: 'https://www.generationsforpeace.org/wp-content/uploads/2018/03/empty-300x240.jpg' })
    }
    getImgByIdPro = (id) => {
        ProductService.getImageByProductId(id).then(res => {
            this.setState({ listImageProductById: res.data.productImage })
        }, function (error) {
            alert("L???i")
        });
    }

    //X??? l?? modal qu???n l?? size c???u s???n ph???m t????ng ???ng
    setShowModalViewSizeProduct = (data) => {
        console.log(data.product.id);
        this.setState({ showModalViewSizeProduct: true })
        var newStateOnSizeModal = {...this.state.stateOnSizeModal, ['productId']:data.product.id }
        this.realTime();
        this.setState({ 
            stateOnSizeModal: newStateOnSizeModal,
            products:{...this.state.products,newStateOnSizeModal}
        });
        console.log("test",this.state.products);
    }

    setCloseModalViewSizeProduct = () => {
        this.setState({ showModalViewSizeProduct: false })
    }

    InputOnChangeCategory = (event) => {
        const { name, value } = event.target; 
        this.state.category.map((category) => {
            if (category.code === value) {
                const newProduct = { ...this.state.products, [name]: category.code}
                this.setState({ products: newProduct });
            }
        })
    }
    InputOnChangeBrand = (event) => {
        const { name, value } = event.target;
        {
            this.state.brand.map((brand) => {
                if (brand.code === value) {
                    const newProduct = { ...this.state.products, [name]: brand.code}
                    this.setState({ products: newProduct });
                }
            })
        }
        
    }


    // reader
    onChangeValueImage(event) {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          var a = document.querySelector(".borderImgSize");
    
          reader.onload = function (e) {
            this.setState({
                products:{...this.state.products,image: e.target.result}
            });
            a.src = e.target.result;
          }.bind(this);
          reader.readAsDataURL(event.target.files[0]);
        }
      }
      onChangeValueImage2(event) {
        if (event.target.files && event.target.files[0]) {
          var reader = new FileReader();
          var a = document.querySelector(".borderImgSize2");
    
          reader.onload = function (e) {
            this.setState({
                products:{...this.state.products,thumbnail: e.target.result}
            });
            a.src = e.target.result;
          }.bind(this);
          reader.readAsDataURL(event.target.files[0]);
        }
      }

    //



    InputOnChangeGroup = (event) => {
        const { name, value } = event.target;
        {
            this.state.group.map((group) => {
                if (group.name === value) {
                    const newProduct = { ...this.state.products, [name]: group.id }
                    this.setState({ products: newProduct });
                }
            })
        }
        
    }
    InputOnChangeTypeSize = (event) => {
        this.setState({ getSizeBySizeType: [] })
        const { value } = event.target;

        SizesService.getSizeByTypeSize(value).then((res) => {
            this.setState({ getSizeBySizeType: res.data.listSize.sort((a, b) => a.sizeName - b.sizeName) })
        });
       
    }
    InputOnChangeSize = (event) => {
        const { name, value } = event.target;
        var newSize = { ...this.state.sizeID, [name]: value } // ... l?? clone tat ca thuoc tinh cua major c?? qua thu???c t??nh m???i, [name] l???y c??i name ???? l??n name c???a t???n t???i n???u k c?? th?? th??nh 1 c??i field m???i
        this.realTime();
        this.setState({ sizeID: newSize });
        this.realTime();
        
    }
    //x??? l?? c??c state trong Size Modal
    InputOnChangeSizeModal = (event) => {
        const { name, value } = event.target;
        var newStateOnSizeModal = { ...this.state.stateOnSizeModal, [name]: value }
        this.realTime();
        this.setState({ 
            stateOnSizeModal: newStateOnSizeModal,
         });
        this.realTime();
    }
    //L??u size c???a s???n ph???m xu???ng db 
    loadDataOnSizeModal(id) {
        ProductService.getProduct(id).then(res => {
            this.setState({ stateProductOnSizeModal: res.data.product })
        }, function (error) {
            alert("L???i kh??ng l???y ???????c s???n ph???m")
        })
    }
    saveOnSizeModal = () => {
        this.props.onAddSizeToImport(this.state.stateOnSizeModal);
        toast.success("???? th??m size!!!")
        this.setCloseModal();
    }
    dateCurrent = () => {
        var date = new Date(Date.now()).toLocaleDateString("vi-Vi")
        return date;
    }
    //X??? l?? l??u v??o redux
    saveToRedux = () => {
        this.props.onAddProductToImport(this.state.products);
        toast.success("???? th??m 1 s???n ph???m!")
        this.setCloseModal();
    }

    deleteProduct = (id) => {
        this.props.onDeleteProductInImport(id);
        toast.success("???? x??a s???n ph???m")
    }
    deleteProductSize = (indexProductSize) => {
        this.props.onDeleteProductSizeInImport(indexProductSize);
        toast.success("???? x??a size")
    }
    processFinalTotalProduct = (indexProduct) => {
        var { productSizes } = this.props
        var total = 0;
        for (var i = 0; i < productSizes.length; i++) {
            if (productSizes[i].productSize.productId === indexProduct) {
                total = total + parseInt(productSizes[i].productSize.productCount)
            }
        }
        return total;
    }
    processBrandIdToName = (idBrand) => {
        var brandName;
        for (var i = 0; i < this.state.brand.length; i++) {
            if (idBrand === this.state.brand[i].id) {
                brandName = this.state.brand[i].name;
                break
            }
        }
        return brandName;
    }
    processTotalAllProductInvoiceImport = () => {
        var { products } = this.props
        var resultTotal = 0;
        for (var i = 0; i < products.length; i++) {
            resultTotal += parseFloat(products[i].product.importPrice) * parseFloat(this.processFinalTotalProduct(products[i].product.id));
        }
        return resultTotal;
    }
    randomStringCodeImport = () => {
        var charSet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var randomString = '';
        var len = 16;
        for (var i = 0; i < len; i++) {
            var randomPoz = Math.floor(Math.random() * charSet.length);
            randomString += charSet.substring(randomPoz, randomPoz + 1);
        }
        return randomString;
    }

    processImport = async () => {
        if (this.state.statePublisherName.publisherName === undefined) {
            toast.info('Vui l??ng nh???p nh?? cung c???p');
        }
        else {
            await ImportService.createImport({
                publisherName:this.state.statePublisherName.publisherName
            }).then(res => {
                toast.success("Nh???p h??ng th??nh c??ng")
                this.saveProductInImportDetail(res.data.createImport.code);
                
            })
            this.deleteImportGoodFromLocalStorage()
            
        } 
    }
    async deleteImportGoodFromLocalStorage() {
        await localStorage.removeItem("STATE_IMPORT");
        await this.loadData();
        
    }
    findIdProductNewCreate = () => {
        var idProduct;
        if (this.state.listProduct.length <= 0) {
            idProduct = 0;
        }
        else {
            idProduct = this.state.listProduct[parseInt(this.state.listProduct.length) - 1].id + 1      //t??m id ti???p theo
        }
        return idProduct
    }
    async saveProductInImportDetail(idImport) {
        var { products, productSizes } = this.props;
        for (var i = 0; i < products.length; i++) {
            await ProductService.createProduct({
                productCode:products[i].product.productCode,
                name:products[i].product.name,
                categoryCode: products[i].product.categoryCode,
                brandCode:products[i].product.brandCode,
                description:products[i].product.description,
                color:products[i].product.color,
                image:products[i].product.image,
                thumbnail:products[i].product.thumbnail,
                importPrice:products[i].product.importPrice,
                sellPrice:products[i].product.sellPrice,
            }).then(async res => {
               await this.firstSaveProductSize(res.data.products.code, res.data.products.importPrice, products[i].product.id, idImport)
            }).catch(async err => {
                console.log("err",err.response);
                if(err.response.data.code===409){
                    if(err.response.data.product){
                        await this.firstSaveProductSize(err.response.data.product.code, err.response.data.product.importPrice, products[i].product.id, idImport)
                    }
                }
                
            })
        }
        await console.log("ahuhu")
        await window.location.reload("/")
    }
    async firstSaveProductSize(idPro, importPrice, idProOnState, idImport) {
        var { products, productSizes } = this.props;
        for (var j = 0; j < productSizes.length; j++) {
            if (productSizes[j].productSize.productId === idProOnState) {
                const dataProductSize = { productCode:idPro , sizeCode:productSizes[j].productSize.sizeCode , productCount:productSizes[j].productSize.productCount};
                await this.saveProductSize(dataProductSize, importPrice, idImport, idPro, idProOnState, productSizes[j].productSize.productCount)
            }
        }
        await console.log("hihihi")
        
        
    }
    async saveProductSize(dataProductSize, importPrice, idImport, idPro, idProOnState, amount) {
        await ProductService.createProductSize({
            productCode:dataProductSize.productCode,
            sizeCode:dataProductSize.sizeCode,
            productCount:dataProductSize.productCount
        }).then(res => {
            this.firstSaveImportDetail(idImport, importPrice,idPro, res.data.productSize.code, idProOnState, amount)
        })
        
    }
    async firstSaveImportDetail(idImport, importPrice,idPro, productSizeCode, idProOnState, amount) {
        var { productSizes } = this.props
        const dataImportDetail = {productSizeCode:productSizeCode,importCode:idImport,productCode:idPro,importPrice:importPrice,amount:amount}
        await this.saveImportDetail(dataImportDetail);
    }
    async saveImportDetail(dataImportDetail) {
        console.log("prsCODE",dataImportDetail.productSizeCode);
        console.log("impCode",dataImportDetail.importCode);
        console.log("impPr",dataImportDetail.importPrice);
        console.log("am",dataImportDetail.amount);
        await ImportService.createImportDetails({
            productSizeCode:dataImportDetail.productSizeCode,
            importCode:dataImportDetail.importCode,
            productCode: dataImportDetail.productCode,
            importPrice:dataImportDetail.importPrice,
            amount:dataImportDetail.amount,
        })
    }
    InputOnChangePublisherName = (event) => {
        const { name, value } = event.target;
        var newPublisherName = { ...this.state.statePublisherName, [name]: value }
        this.realTime();
        this.setState({ statePublisherName: newPublisherName });
        this.realTime();
      
    }
    _viewModalAddProduct = () => {
        const { products } = this.state;
        return (
            <Modal
                show={this.state.showModal}
                onHide={this.setCloseModal}
                keyboard={false}
                backdrop="static"
                dialogClassName="modalMaxWidth"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title " dialogClassName="textCenterModalTitle">
                        Th??m th??ng tin s???n ph???m
                                {this.state.message === true ? <div>Vui l??ng nh???p ????? c??c ?? input</div> : null}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <div className="row">
                            <div className="col-6">
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>M?? s???n ph???m</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="productCode"
                                        placeholder="M?? s???n ph???m"
                                        onChange={this.InputOnChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>T??n s???n ph???m</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="name"
                                        placeholder="T??n s???n ph???m"
                                        onChange={this.InputOnChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicName">
                                    <Form.Label>M??u s???c</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        name="color"
                                        placeholder="M??u s???c c???a gi??y"
                                        onChange={this.InputOnChange}
                                    />
                                </Form.Group>
                                <Form.Group controlId="ControlSelect">
                                    <Form.Label>Th????ng hi???u</Form.Label>
                                    <Form.Control
                                        required
                                        as="select"
                                        name="brandCode"
                                        onChange={this.InputOnChangeBrand}
                                    >
                                        <option>{products.Brand === undefined ? 'Choose.....' : products.Brand.name}</option>
                                        {this.state.brand.map((brand, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={brand.code}>
                                                    {brand.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="ControlSelect">
                                    <Form.Label>Danh m???c</Form.Label>
                                    <Form.Control
                                        required
                                        as="select"
                                        name="categoryCode"
                                        onChange={this.InputOnChangeCategory}
                                    // value={products.Category || ''}
                                    >
                                        <option>{products.Category === undefined ? 'Choose.....' : products.Category.name}</option>
                                        {this.state.category.map((category, idx) => {
                                            return (
                                                <option
                                                    key={idx}
                                                    value={category.code}>
                                                    {category.name}
                                                </option>
                                            )
                                        })}
                                    </Form.Control>
                                </Form.Group>
                                <Form>
                                    <div>???nh ?????i di???n c???a s???n ph???m</div>
                                    <div className="borderImgSizeIcon1">
                                        <label for="upload-avatar-photo" className="iconOnImgBorder1"><i className="fas fa-image fa-3x"></i></label>
                                        <Form.Control
                                            id="upload-avatar-photo"
                                            type="file"
                                            accept=".png, .jpg, .svg, .jfif"
                                            onChange={this.onChangeValueImage}
                                            name="imagePath"
                                            oninput="pic.src=window.URL.createObjectURL(this.files[0])"
                                        />
                                    </div>
                                    <img className="borderImgSize" src="#" />
                                </Form>
                            </div>
                            <div className="col-6">
                                <Form>
                                    <div>H??nh ???nh Thumbnail</div>
                                    <div className="borderImgSizeIcon1">
                                        <label for="upload-photo" className="iconOnImgBorder1"><i className="fas fa-image fa-3x"></i></label>
                                        <Form.Control
                                            id="upload-photo"
                                            type="file"
                                            accept=".png, .jpg, .svg, .jfif"
                                            onChange={this.onChangeValueImage2}
                                            name="imagePath"
                                            oninput="pic.src=window.URL.createObjectURL(this.files[0])"
                                        />
                                    </div>
                                    <img className="borderImgSize2" src="#"/>
                                </Form>
                                <Form.Group controlId="formBasicQuantity">
                                    <Form.Label>Gi?? nh???p</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="importPrice"
                                        placeholder="Gi?? nh???p"
                                        onChange={this.InputOnChange}

                                    />
                                </Form.Group>
                                <Form.Group controlId="formBasicQuantity">
                                    <Form.Label>Gi?? b??n</Form.Label>
                                    <Form.Control
                                        required
                                        type="number"
                                        name="sellPrice"
                                        placeholder="Gi?? b??n"
                                        onChange={this.InputOnChange}

                                    />
                                </Form.Group>
                                <Form.Group controlId="exampleForm.ControlTextarea1">
                                    <Form.Label>M?? t??? s???n ph???m</Form.Label>
                                    <Form.Control
                                        required
                                        as="textarea"
                                        type="text"
                                        name="description"
                                        rows={8}
                                        onChange={this.InputOnChange}

                                    />
                                </Form.Group>
                            </div>
                        </div>
                        <Button variant="primary btnSave" onClick={this.saveToRedux}>
                            Th??m
                    </Button>
                    </Form>
                </Modal.Body>
            </Modal>
        );
    }
    _viewSize = () => {
        return (
            <Modal
                show={this.state.showModalViewSizeProduct}
                onHide={this.setCloseModalViewSizeProduct}
                keyboard={false}
                backdrop="static"
                dialogClassName="modalSizeMaxWidth"
                aria-labelledby="example-custom-modal-styling-title"
            >
                <Modal.Header closeButton>
                    <Modal.Title id="example-custom-modal-styling-title " dialogClassName="textCenterModalTitle">
                        Th??m th??ng tin t???t c??? c??c k??ch th?????c c???a s???n ph???m
                        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="row">
                        <div className="col-7">
                            <Tabs justify defaultActiveKey="orderNotConfirm" transition={false} id="noanim-tab-example">
                                <Tab
                                    eventKey="orderNotConfirm"
                                    title="Th??m t???ng k??ch th?????c m???t cho s???n ph???m"
                                    tabClassName="">
                                    <div className="nameTitleSize">Th??m k??ch th?????c cho s???n ph???m</div>
                                    <div className="container">
                                        <Form>
                                            <Form.Group controlId="ControlSelect">
                                                <Form.Label>Lo???i size</Form.Label>
                                                <Form.Control
                                                    required
                                                    as="select"
                                                    name="typeSize"
                                                    onChange={this.InputOnChangeTypeSize}
                                                >
                                                    <option>Choose....</option>
                                                    {this.state.typeSize.map((typeSize, idx) => {
                                                        return (
                                                            <option
                                                                key={idx}
                                                                value={typeSize.name}>
                                                                {typeSize.name}
                                                            </option>
                                                        )
                                                    })}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>Size gi??y</Form.Label>
                                                <Form.Control
                                                    required
                                                    as="select"
                                                    name="sizeCode"
                                                    onChange={this.InputOnChangeSizeModal}
                                                >
                                                    <option>Choose....</option>
                                                    {this.state.getSizeBySizeType.map((size, idx) => {
                                                        return (
                                                            <option
                                                                key={idx}
                                                                value={size.code}
                                                            >
                                                                {size.sizeName}
                                                            </option>
                                                        )
                                                    })}
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId="formBasicPassword">
                                                <Form.Label>S??? l?????ng</Form.Label>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="S??? l?????ng"
                                                    name="productCount"
                                                    onChange={this.InputOnChangeSizeModal} />
                                            </Form.Group>
                                            <Button variant="primary" onClick={this.saveOnSizeModal}>
                                                L??u
                                                    </Button>
                                        </Form>
                                    </div>

                                </Tab>
                                <Tab
                                    eventKey = "orderConfirm"
                                    title = "Th??m nhi???u k??ch th?????c cho s???n ph???m"
                                    tabClassName="">
                                    <div className="titleTable">B???ng ????n h??ng ???? ???????c x??c nh???n</div>
                                </Tab>
                            </Tabs>

                        </div>
                        <div className="col-5">
                            <div className="sizeNameTable">K??ch th?????c c???a s???n ph???m</div>
                            <div className="tbl-header">
                                <Table striped hover>
                                    <thead>
                                        <tr>
                                            <th className="th_Sticky">Size ID</th>
                                            <th className="th_Sticky">S??? l?????ng</th>
                                            <th className="th_Sticky">H??nh ?????ng</th>
                                        </tr>
                                    </thead>
                                    {this.props.productSizes ?     //ki???m tra xem c?? t???n t???i hay ch??a
                                        <tbody>
                                            {this.props.productSizes.map((ProductSizes, idx) => {
                                                    for (var i = 0; i < this.state.sizes.length; i++) {
                                                        if (this.state.sizes[i].code === ProductSizes.productSize.sizeCode) {       //??i???u ki???n ????? hi???n th??? t??m size ra
                                                            return (
                                                                <tr key={idx}>
                                                                    <td>{this.state.sizes[i].sizeType +": "+ this.state.sizes[i].sizeName}</td>
                                                                    <td>{ProductSizes.productSize.productCount}</td>
                                                                    <td><i className="fas fa-trash-alt trashIconOnModalProductSize" onClick={() => this.deleteProductSize(idx)}></i></td>
                                                                </tr>
                                                            )
                                                        }
                                                    }
                                            })}
                                        </tbody> : null}
                                </Table>
                            </div>
                        </div>

                    </div>

                </Modal.Body>
            </Modal>
        );
    }
    render() {
        const formatter = new Intl.NumberFormat('vi-VN', {
            style: 'currency',
            currency: 'VND',
            minimumFractionDigits: 0
        })
        return (
            <div>
                {this._viewModalAddProduct()}
                {this._viewSize()}
                <>
                <ToastContainer />
                    <CRow>
                        <CCol>
                            <CCard>
                                <CCardHeader>
                                    <p className="fontSizeNameTable">H??a ????n nh???p h??ng</p>
                                </CCardHeader>
                                <CCardBody>
                                    <button type="button" className="btn btn-sm btnAddProduct1" onClick={() => this.setShowModal()}><p className="fas fa-plus-circle textInBtnAddProduct">Th??m s???n ph???m</p></button>
                                    <div className="tbl-header">
                                        <Table striped hover>
                                            <thead>
                                                <tr className="trBackGround">
                                                    <th className="th_Sticky">#</th>
                                                    <th className="th_Sticky">Product Code</th>
                                                    <th className="th_Sticky">Name Product</th>
                                                    <th className="th_Sticky">Color</th>
                                                    <th className="th_Sticky">Brand</th>
                                                    <th className="th_Sticky widthSlotSizeOnTable">Size</th>
                                                    <th className="th_Sticky">Price Imp</th>
                                                    <th className="th_Sticky">Price Sell</th>
                                                    <th className="th_Sticky">Quantity</th>
                                                    <th className="th_Sticky">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.props.products.map((product, idx) => {
                                                    return (
                                                        <tr key={idx}>
                                                            <td>{idx + 1}</td>
                                                            <td>{product.product.productCode}</td>
                                                            <td>{product.product.name}</td>
                                                            <td>{product.product.color}</td>
                                                            <td>{this.processBrandIdToName(product.product.brandCode)}</td>
                                                            <td>
                                                                <div className="view" onClick={() => this.setShowModalViewSizeProduct(product)}>Th??m Size</div>
                                                                <div className="boxSize">
                                                                    {this.props.productSizes.map((ProductSizes, idxa) => {
                                                                        if (ProductSizes.productSize.productId === product.product.id) {
                                                                            for (var i = 0; i < this.state.sizes.length; i++) {
                                                                                if (this.state.sizes[i].id === parseInt(ProductSizes.productSize.sizeId)) {       //??i???u ki???n ????? hi???n th??? t??m size ra
                                                                                    return (
                                                                                        <div className="displaySizeBox">{this.state.sizes[i].sizeName}</div>
                                                                                    )
                                                                                }
                                                                            }

                                                                        }
                                                                        else { return }
                                                                    })}
                                                                </div>
                                                            </td>
                                                            <td>{formatter.format(product.product.importPrice)}</td>
                                                            <td>{formatter.format(product.product.sellPrice)}</td>
                                                            <td>{this.processFinalTotalProduct(product.product.id)}</td>
                                                            <td>
                                                                <i className="fas fa-trash-alt trashIcon" onClick={() => this.deleteProduct(idx)}></i>
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </Table>
                                    </div>
                                </CCardBody>
                                <CCardFooter>
                                    <div className="row">
                                        <div className="col-6">
                                            <div className="infoDateInvoice">
                                                Ng??y nh???p: {this.dateCurrent()}
                                            </div>

                                        </div>
                                        <div className="col-6">
                                            <Form.Group controlId="formBasicName">
                                                <Form.Label>T??n nh?? cung c???p</Form.Label>
                                                <Form.Control
                                                    required
                                                    type="text"
                                                    name="publisherName"
                                                    placeholder="Nh?? cung c???p"
                                                    onChange={this.InputOnChangePublisherName}
                                                />
                                            </Form.Group>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-6">
                                        </div>
                                        <div className="col-6">
                                            <div className="row">
                                                <div className="col-6">
                                                    <div className="infoInvoice">
                                                        T???ng ti???n
                                                    </div>
                                                </div>
                                                <div className="col-6">
                                                    <div className="infoInvoice infoInvoiceTotal">
                                                        {formatter.format(this.processTotalAllProductInvoiceImport())}
                                                        {/* 100.000.000?? */}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-9">
                                        </div>
                                        <div className="col-3">
                                            <div className="containerBtn">
                                                <Button variant="danger btnCancel">H???y</Button>
                                                <Button variant="primary btnSave" onClick={() => this.processImport()}>L??u h??a ????n</Button>
                                            </div>
                                        </div>
                                    </div>
                                </CCardFooter>
                            </CCard>
                        </CCol>
                    </CRow>
                </>
            </div>
        );
    }
    imageHandler = (event) => {
        // const {name} = event.target;
        const reader = new FileReader()
        reader.onload = () => {
            if (reader.readyState === 2) {
                this.state.listImage.push(reader.result);
                this.realTime();    //C???p nh???t state ngay l???p t???c
            }
        }
        // const newProduct = {...this.state.products, [name]: event.target.files[0] } // ... l?? clone tat ca thuoc tinh cua major c?? qua thu???c t??nh m???i, [name] l???y c??i name ???? l??n name c???a t???n t???i n???u k c?? th?? th??nh 1 c??i field m???i
        // this.setState({products: newProduct });
        
        this.state.listImageToApi.push(event.target.files[0])
        this.realTime();    //C???p nh???t state ngay l???p t???c
        // this.setState({tempImage: true})s
    
        // reader.readAsDataURL(e.target.files[0])
        reader.readAsDataURL(event.target.files[0])
    }
    ShowModalImage = (id) => {

    }
    imageAvatarProductHandler = (event) => {
        const reader1 = new FileReader()
        reader1.onload = () => {
            if (reader1.readyState === 2) {
                this.setState({ avatarProduct: reader1.result })
                this.realTime();    //C???p nh???t state ngay l???p t???c
            }
        }
        this.state.avatarProductSaveAPI.push(event.target.files[0])
        this.realTime();    //C???p nh???t state ngay l???p t???c
 
        reader1.readAsDataURL(event.target.files[0])
    }
}
export default ImportGood;