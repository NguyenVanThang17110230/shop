import React, { Component } from 'react';
import './products.css';
import {
  Button,
  Modal,
  Form,
  Table,
  Carousel, Tabs, Tab, Dropdown
} from "react-bootstrap";
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow
} from '@coreui/react'

import ProductService from "../../../services/ProductService";
import BrandService from "../../../services/BrandService";
import CategoryService from "../../../services/CategoryService";
import GroupService from "../../../services/GroupService";
import SizesService from '../../../services/SizesService';


import { message } from 'antd';
import { toast, ToastContainer } from 'react-toastify';
const getBadge = status => {
  switch (status) {
    case 'Active': return 'success'
    case 'Inactive': return 'secondary'
    case 'Pending': return 'warning'
    case 'Banned': return 'danger'
    default: return 'primary'
  }
}
const fields = ['name', 'amount', 'brandId', 'categoryId', 'groupID', 'quantity', 'price']
class Products extends Component {
  constructor(props) {
    super(props);
    this.onChangeValue = this.onChangeValue.bind(this);
    this.onChangeValueImage = this.onChangeValueImage.bind(this);
    this.onChangeValueImage2 = this.onChangeValueImage2.bind(this);
    this.state = {
      showModal: false,
      products: {},
      listProduct: [],
      brand: [],
      category: [],
      listImage: [],
      group: [],
      editBrand: '',
      editCategory: '',
      editGroup: '',
      edit: false,
      updateDaily: '',
      tempImage: '',
      realTime: '',
      image: '',
      thumbnail: '',
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
      listImageToApi: [], ///List ảnh để đưa xuống backend xử lý
      showModalViewImage: false,    //Biến hiển thị modal ảnh
      showModalViewSizeProduct: false,      //biến hiển thị modal size
      getSizeBySizeType: [],
      sizes: [],
      sizeID: {},        //lưu size id
      avatarProduct: '',
      avatarProductSaveAPI: [],
      message: false,
      listImageProductById: [],
      //state dùng để lưu các giá trị xử lý trong size modal
      stateOnSizeModal: [],
      stateProductOnSizeModal: '',
      showModalCreateImage: false,


      //state on model create image
      idOnModalCreateImg: '',
      nameOnModalCreateImg: '',
      codeOnModalCreateImg: '',
      codePr: '',
      //State Promotion
      statePromotion: [],
      sizeCode: "",
      productCount: "",
    }




  };
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
  getNameBrand = code => {
    const { brand } = this.state;
    const test = brand.find(x => x.code === code)
    if (test) {
      return test.name
    }
  }
  getNameCategory = code => {
    const { category } = this.state;
    const test = category.find(x => x.code === code)
    if (test) {
      return test.name
    }
  }
  InputOnChange = (event) => {
    const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
    var newProduct = { ...this.state.products, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
    this.realTime();
    this.setState({ products: newProduct });
    this.realTime();
    console.log(this.state.products)
  }

  onChangeValueImage(event) {
    if (event.target.files && event.target.files[0]) {

      var reader = new FileReader();
      var a = document.getElementById("srcImage");
      reader.onload = function (e) {
        this.setState({
          image: e.target.result,
        });
        console.log("fffff", a);
        // a.src = e.target.result;


      }.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    }
  }
  onChangeValueImage2(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
      var a = document.querySelector(".test2");

      reader.onload = function (e) {
        this.setState({
          thumbnail: e.target.result,
        });
        // a.src = e.target.result;
      }.bind(this);
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  //Chuẩn bị đầu tiên cho lưu sản phẩm
  firstSaveImage = (idProduct) => {
    this.realTime()
    console.log(idProduct)
    console.log(this.state.listImageToApi)
    for (var i = 0; i < this.state.listImageToApi.length; i++) {
      this.saveImage(i, idProduct);
    }
  }
  saveImage = (index, idProduct) => {
    var data = new FormData();
    console.log(idProduct)
    data.append("productId", idProduct);
    data.append("imagePath", this.state.listImageToApi[index]);
    this.realTime()
    console.log(this.state.stateID)
    ProductService.createImage(data)
  }
  saveProduct = async () => {
    var { products, avatarProductSaveAPI } = this.state
    var data = {
      productCode: '',
      name: '',
      image: '',
      thumbnail: '',
      description: '',
      color: '',
      sellPrice: '',
      categoryCode: '',
      brandCode: '',
    }
    console.log("sss", products.code);
    if (this.state.image === '') {
      data.image = products.image
    }
    else {
      data.image = this.state.image
    }
    if (this.state.thumbnail === '') {
      data.thumbnail = products.thumbnail
    }
    else {
      data.thumbnail = this.state.thumbnail
    }
    data.productCode = products.productCode
    data.name = products.name
    data.description = products.description
    data.color = products.color
    data.sellPrice = products.sellPrice
    data.categoryCode = products.categoryCode
    data.brandCode = products.brandCode
    await ProductService.updateProduct(products.code,
      {
        productCode: data.productCode,
        name: data.name,
        categoryCode: data.categoryCode,
        brandCode: data.brandCode,
        description: data.description,
        color: data.color,
        image: data.image,
        thumbnail: data.thumbnail,
        sellPrice: data.sellPrice,
      }
    ).then(res => {
      toast.success("Sửa thông tin thành công")
      this.loadData();
      this.setCloseModal();
    }, function (error) {
      toast.error("sửa thông tin thất bại")
    });
  }
  firstSaveSize = (idProduct) => {
    var newSize = { ...this.state.sizeID, ['productId']: idProduct } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
    this.setState({ sizeID: newSize });
    this.realTime()
    console.log(this.state.sizeID)
    this.saveSize(this.state.sizeID);
  }
  saveSize(data) {
    this.realTime()
    ProductService.createProductSize(data);
  }
  save = () => {
    var { products } = this.state
    this.saveProduct();
  }

  setShowModal = (id) => {
    this.setState({ products: {} });
    // this.setState({ ModalTitle: "New Instructor" });
    this.realTime();
    this.setState({ showModal: true });
  }
  setShowModalEdit = (id) => {

    // this.setState
    //
    ProductService.getProduct(id).then(res => {
      this.setState({ products: res.data.product });
    });

    // this.setState({ editBrand: brand });
    // this.setState({ editCategory: category });
    this.setState({ showModal: true });
    this.setState({ edit: true })
    this.realTime();
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
      alert("Lỗi")
    });
  }
  //Xử lý modal của ảnh sản phẩm
  setShowModalViewImage = (id) => {
    this.setState({ showModalViewImage: true })
    console.log(this.state.listProduct)
    this.getImgByIdPro(id);
  }
  setCloseModalViewImage = () => {
    this.setState({ showModalViewImage: false })
  }
  onChangeValue(event) {
    var name = event.target.name;
    var value = event.target.value;
    this.setState({
      [name]: value,
    });
  }
  saveSize = async () => {
    const { codePr } = this.state

    await ProductService.createProductSize({
      productCode: codePr,
      sizeCode: this.state.sizeCode,
      productCount: this.state.productCount
    }).then((response) => {
      toast.success("thêm size thành công")
      this.loadData2();
    }).catch((error) => {
      toast.error("thêm size thất bại")
    })
  }
  loadData2 = () => {
    const { codePr } = this.state
    ProductService.get(codePr).then(res => {
      this.setState({ stateProductOnSizeModal: res.data.productSizes })
    })
  }
  viewName = code =>{
    const {sizes} = this.state
    const test = sizes.find(x => x.code === code)
    if(test){
      return test.sizeType
    }
  }
  viewName2 = code =>{
    const {sizes} = this.state
    const test = sizes.find(x => x.code === code)
    if(test){
      return test.sizeName
    }
  }
  //Khu vực xử lý code của modal Create Image
  setShowModalCreateImage = (id) => {
        this.setState({ showModalCreateImage: true })
        this.setState({ idOnModalCreateImg: id })
        this.processGetNameProduct(id);
      }
  setCloseModalCreateImage = () => {
        this.setState({ showModalCreateImage: false })
      }

  //Lấy tên sản phẩm và Lấy mã sản phẩm
  processGetNameProduct = (id) => {
        var { listProduct } = this.state
        console.log(listProduct)
        console.log(id)
        for (var i = 0; i < listProduct.length; i++) {
          if (id === listProduct[i].id) {
            console.log(listProduct[i].name)
            console.log(listProduct[i].productCode)
            this.setState({ nameOnModalCreateImg: listProduct[i].name });
            this.setState({ codeOnModalCreateImg: listProduct[i].productCode });
          }
        }
      }
  async saveImageProduct(id) {
      console.log(id);
      await this.saveAvatarImage(id);
      await this.firstSaveImage(id);
      await this.setState({ avatarProductSaveAPI: [] });
      await this.setState({ listImageToApi: [] });
      await this.loadData();
      await this.loadData();
    }
  saveAvatarImage = (id) => {
        var data = new FormData();
        console.log(this.state.avatarProductSaveAPI[[0]])
        data.append("imagePath", this.state.avatarProductSaveAPI[[0]]);
        ProductService.updateProduct(data, id)

        this.setCloseModalCreateImage()
        this.componentDidMount()
      }
  //Lấy mã sản phẩm
  // processGetCodeProduct = (id) =>{
  //   var { product } = this.state.listProduct
  //   for(var i = 0; i < product.length; i++){
  //     if(id === product.id){
  //       {}
  //     }
  //   }
  // }
  //Xử lý modal quản lý size cảu sản phẩm tương ứng
  setShowModalViewSizeProduct = (code) => {
        console.log("code", code);
        this.setState({ showModalViewSizeProduct: true }) //set để mở modal

        var newStateOnSizeModal = { ...this.state.stateOnSizeModal, ['productId']: code }
        this.realTime();
        this.setState({
          stateOnSizeModal: newStateOnSizeModal,
          codePr: code
        });
        ProductService.getProductSizeByProductCode(code).then(res => {
          this.setState({ stateProductOnSizeModal: res.data.productSizes })
        }, function (error) {
          alert("Lỗi không lấy được sản phẩm")
        })

      }

  setCloseModalViewSizeProduct = () => {
        this.setState({ showModalViewSizeProduct: false })
      }

  InputOnChangeCategory = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        {
          this.state.category.map((category) => {
            if (category.code === value) {
              const newProduct = { ...this.state.products, [name]: category.code }
              this.setState({ products: newProduct });
            }
          })
        }
        console.log(this.state.products)
      }
  InputOnChangeBrand = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        {
          this.state.brand.map((brand) => {
            if (brand.code === value) {
              const newProduct = { ...this.state.products, [name]: brand.code }
              this.setState({ products: newProduct });
            }
          })
        }
        console.log(this.state.products)
      }

  InputOnChangeGroup = (event) => {
        const { name, value } = event.target; // đặt biến để phân rã các thuộc tính trong iout ra
        // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        {
          this.state.group.map((group) => {
            if (group.name === value) {
              const newProduct = { ...this.state.products, [name]: group.code }
              this.setState({ products: newProduct });
            }
          })
        }
        console.log(this.state.products)
      }
  InputOnChangeTypeSize = (event) => {
        this.setState({ getSizeBySizeType: [] })
        const { value } = event.target;

        SizesService.getSizeByTypeSize(value).then((res) => {
          this.setState({ getSizeBySizeType: res.data.listSize.sort((a, b) => a.sizeName - b.sizeName) })
        });
        console.log(this.state.getSizeBySizeType)
      }
  InputOnChangeSize = (event) => {
        const { name, value } = event.target;
        var newSize = { ...this.state.sizeID, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.realTime();
        this.setState({ sizeID: newSize });
        this.realTime();
        console.log(this.state.sizeID)
      }
  //xử lý các state trong Size Modal
  InputOnChangeSizeModal = (event) => {
        const { name, value } = event.target;
        var newStateOnSizeModal = { ...this.state.stateOnSizeModal, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.realTime();
        this.setState({ stateOnSizeModal: newStateOnSizeModal });


        this.realTime();
        console.log(this.state.stateOnSizeModal)
        console.log(this.state.stateProductOnSizeModal)

      }
  //Lưu size của sản phẩm xuống db 
  loadDataOnSizeModal(id) {
      ProductService.getProduct(id).then(res => {
        this.setState({ stateProductOnSizeModal: res.data.product })
      }, function (error) {
        alert("Lỗi không lấy được sản phẩm")
      })
    }
  saveOnSizeModal = () => {
        ProductService.createProductSize(this.state.stateOnSizeModal).then(res => {
        }, function (error) {
          alert("Lỗi")
        })
        // alert("Thêm thành công")
        this.loadDataOnSizeModal(this.state.stateOnSizeModal.productId)
      }

  inputOnchangePromotion = (event) => {
        const { name, value } = event.target;
        var newStatePromotion = { ...this.state.statePromotion, [name]: value } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
        this.realTime();
        this.setState({ statePromotion: newStatePromotion });
        this.realTime();
      }
  savePromotion = (id) => {
        ProductService.updateProduct(this.state.statePromotion, id).then(res => {
          alert("Cập nhật giảm giá thành công")
          this.loadData()
        })
      }
  delete =(type) => {
      var result = window.confirm("Bạn chắc chắn muốn xóa loại sản phẩm này không?")
      if (result) {
        ProductService.deleteService(type)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              toast.success("Xóa thành công!!!");
              this.loadData();
            }
            else {
              toast.error("Xóa thất bại");
            }
          })
        //   .catch((err) => toast.error(err.response.data));
      }
      else {
        console.log('jjj');
      }
    }
  saveEdit = async () => {
        const data = {
          name: '',
          summary: '',
        }
        if (this.state.imagePathEdit === '') {
          data.image = this.state.stateBrand.image
        }
        else {
          data.image = this.state.imagePathEdit
        }
        data.name = this.state.stateBrand.name
        data.summary = this.state.stateBrand.summary
        await BrandService.updateBrandById(this.state.stateBrand.code, {
          name: data.name,
          summary: data.summary,
          image: data.image,
        }).then(res => {
          if (res.status === 200) {
            toast.success('Chỉnh sửa thành công!')
          }
          this.loadData()
        }, function (error) {
          toast.error("Lỗi không lưu được!")
        })
        this.setCloseModalEditBrand()
      }
      deleteSize = (type) => {
        console.log("yt",type);
        var result = window.confirm("Bạn chắc chắn muốn xóa loại size này không?")
        if(result){
          ProductService.deletePrSizeService(type.code)
          .then((res)=>{
            console.log(res);
            if(res.status === 200){
              toast.success("Xóa thành công");
              ProductService.getProductSizeByProductCode(type.productCode).then(res => {
                this.setState({ stateProductOnSizeModal: res.data.productSizes })
              }, function (error) {
                alert("Lỗi không lấy được sản phẩm")
              })
              this.loadData();
            }
            else
            {
              toast.error("Xóa thất bại");
            }
          })
          .catch((err) => toast.error(err.response.data));
        }
        else{
            console.log('jjj');
        }
    }
  render() {
      const { products, productEdit } = this.state
    const formatterNum = Intl.NumberFormat('en');
      var reader = new FileReader();
      const formatter = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
        minimumFractionDigits: 0
      })

    console.log("abc", this.state);
      return(
      <div>
    <div className="container">
      {/* <button type="button" className="btn btn-sm btnAddProduct" onClick={() => this.setShowModal(-1)}>
            <p className="fas fa-plus-circle textInBtnAddProduct">   Thêm sản phẩm</p>
          </button> */}
    </div>
        {/* Modal basic */ }
      <>
          <ToastContainer />
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
            Sửa thông tin sản phẩm
                {this.state.message === true ? <div>Vui lòng nhập đủ các ô input</div> : null}
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <div className="row">
                  <div className="col-6">
                    <Form.Group controlId="formBasicName">
                      <Form.Label>Mã sản phẩm</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="productCode"
                        placeholder="Mã sản phẩm"
                        onChange={this.InputOnChange}
                        value={products.productCode || ''} />
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                      <Form.Label>Tên sản phẩm</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        placeholder="Tên sản phẩm"
                        onChange={this.InputOnChange}
                        value={products.name || ''} />
                    </Form.Group>
                    <Form.Group controlId="formBasicName">
                      <Form.Label>Màu sắc</Form.Label>
                      <Form.Control
                        required
                        type="text"
                        name="color"
                        placeholder="Màu sắc của giày"
                        onChange={this.InputOnChange}
                        value={products.color || ''} />
                    </Form.Group>
                    <Form.Group controlId="ControlSelect">
                      <Form.Label>Thương hiệu</Form.Label>
                      <Form.Control
                        required
                        as="select"
                        name="brandCode"
                        onChange={this.InputOnChangeBrand}
                        defaultValue={products.brandCode}
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
                      <Form.Label>Danh mục</Form.Label>
                      <Form.Control
                        required
                        as="select"
                        name="categoryCode"
                        onChange={this.InputOnChangeCategory}
                        defaultValue={products.categoryCode}
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
                      <div>Ảnh đại diện của sản phẩm</div>
                      <div className="borderImgSizeIcon">
                        <label for="upload-avatar-photo" className="iconOnImgBorder"><i className="fas fa-image fa-3x"></i></label>
                        <Form.Control
                          id="upload-avatar-photo"
                          type="file"
                          accept=".png, .jpg, .svg, .jfif"
                          onChange={this.onChangeValueImage}
                          name="image"
                          oninput="pic.src=window.URL.createObjectURL(this.files[0])"
                        />
                      </div>
                      {this.state.products.image ?
                        <div>
                          {this.state.image === '' ?
                            <img className="borderImgSizeBrand" src={this.state.products.image} /> : <img className="borderImgSizeBrand" src={this.state.image} />
                          }
                        </div> :
                        <div>
                          {this.state.image === '' ? null :
                            <img className="borderImgSizeBrand" src={this.state.image} />
                          }
                        </div>
                      }
                    </Form>

                  </div>
                  <div className="col-6">
                    <Form>
                      <div>Hình ảnh Thumbnail</div>
                      <div className="borderImgSizeIcon">
                        <label for="upload-photo" className="iconOnImgBorder"><i className="fas fa-image fa-3x"></i></label>
                        <Form.Control
                          id="upload-photo"
                          type="file"
                          accept=".png, .jpg, .svg, .jfif"
                          onChange={this.onChangeValueImage2}
                          name="thumbnail"
                          oninput="pic.src=window.URL.createObjectURL(this.files[0])"
                        />
                      </div>
                      {this.state.products.thumbnail ?
                        <div>
                          {this.state.thumbnail === '' ?
                            <img className="borderImgSizeBrand" src={this.state.products.thumbnail} /> : <img className="borderImgSizeBrand" src={this.state.thumbnail} />
                          }
                        </div> :
                        <div>
                          {this.state.thumbnail === '' ? null :
                            <img className="borderImgSizeBrand" src={this.state.thumbnail} />
                          }
                        </div>
                      }
                    </Form>
                    <Form.Group controlId="formBasicQuantity">
                      <Form.Label>Giá tiền</Form.Label>
                      <Form.Control
                        required
                        type="number"
                        name="sellPrice"
                        placeholder="Giá tiền"
                        onChange={this.InputOnChange}
                        value={products.sellPrice || ''}
                      />
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlTextarea1">
                      <Form.Label>Mô tả sản phẩm</Form.Label>
                      <Form.Control
                        required
                        as="textarea"
                        type="text"
                        name="description"
                        rows={12}
                        onChange={this.InputOnChange}
                        value={products.description}
                      />
                    </Form.Group>
                  </div>
                </div>
                <Button variant="primary" onClick={this.save}>
              Cập nhật
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </>
      {/* Modal Image */ }
      <>
      <Modal
        show={this.state.showModalViewImage}
        onHide={this.setCloseModalViewImage}
        keyboard={false}
        backdrop="static"
        dialogClassName="modalImageMaxWidth"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title " dialogClassName="textCenterModalTitle">
            Thêm thông tin sản phẩm
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Carousel>
              {this.state.listImageProductById.map((listImageProduct, idx) => {
                return (
                  <Carousel.Item>
                    <img
                      key={idx}
                      className="d-block w-100"
                      src={`http://localhost:5000/${listImageProduct.imagePath}`}
                    />
                  </Carousel.Item>
                )
              })
              }
            </Carousel>
          </Form>
        </Modal.Body>
      </Modal>
        </>
      {/* Modal Size */ }
      <>
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
            Thêm thông tin tất cả các kích thước của sản phẩm
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row">
            <div className="col-8">
              <div className="sizeNameTable">Kích thước của sản phẩm</div>
              <div className="tbl-header">
                <Table striped hover>
                  <thead>
                    <tr>
                      <th className="th_Sticky">Type Name</th>
                      <th className="th_Sticky">Size</th>
                      <th className="th_Sticky">Quantity</th>
                      <th className="th_Sticky">Action</th>
                    </tr>
                  </thead>
                  {this.state.stateProductOnSizeModal ?     //kiểm tra xem có tồn tại hay chưa
                    <tbody>
                      {this.state.stateProductOnSizeModal.map((ProductSizes, idx) => {
                        return (
                          <tr key={idx}>
                            <td>{this.viewName(ProductSizes.sizeCode)}</td>
                            <td>{this.viewName2(ProductSizes.sizeCode)}</td>
                            <td>{ProductSizes.productCount}</td>
                            <td>
                              <i 
                              className="fas fa-trash-alt trashOnTableSize"
                              onClick={()=>this.deleteSize(ProductSizes)}
                              >
                                </i>
                              </td>
                          </tr>
                        )
                      })}
                    </tbody> : null}
                </Table>
              </div>
            </div>
            <div className="col-4">
              <div className="sizeNameTable">Thêm kích thước của sản phẩm</div>
              <Form>
                <Form.Group controlId="ControlSelect">
                  <Form.Label>Loại size</Form.Label>
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
                  <Form.Label>Size giày</Form.Label>
                  <Form.Control
                    required
                    as="select"
                    name="sizeCode"
                    onChange={this.onChangeValue}
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
                  <Form.Label>Số lượng</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Số lượng"
                    name="productCount"
                    onChange={this.onChangeValue} />
                </Form.Group>
                <Button variant="primary" onClick={this.saveSize}>
                  Lưu
                    </Button>
              </Form>
            </div>
          </div>





        </Modal.Body>
      </Modal>
        </>
      {/* Modal add image to product */ }
      <>
      <Modal
        show={this.state.showModalCreateImage}
        onHide={this.setCloseModalCreateImage}
        keyboard={false}
        backdrop="static"
        dialogClassName="modalMaxWidthCreateImage"
        aria-labelledby="example-custom-modal-styling-title"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-custom-modal-styling-title " dialogClassName="textCenterModalTitle">
            Thêm thông tin sản phẩm
              </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Mã sản phẩm</Form.Label>
              <Form.Control
                required
                type="text"
                name="productCode"
                placeholder="Mã sản phẩm"
                value={this.state.codeOnModalCreateImg || ''}
                disabled />
            </Form.Group>
            <Form.Group controlId="formBasicName">
              <Form.Label>Tên sản phẩm</Form.Label>
              <Form.Control
                required
                type="text"
                name="name"
                placeholder="Tên sản phẩm"
                value={this.state.nameOnModalCreateImg || ''}
                disabled />
            </Form.Group>
            <Form>
              <div>Ảnh đại diện của sản phẩm</div>
              <div className="borderImgSizeIcon">
                <label for="upload-avatar-photo" className="iconOnImgBorder"><i className="fas fa-image fa-3x"></i></label>
                <Form.Control
                  id="upload-avatar-photo"
                  type="file"
                  accept=".png, .jpg, .svg, .jfif"
                  onChange={this.imageAvatarProductHandler}
                  name="imagePath"
                  oninput="pic.src=window.URL.createObjectURL(this.files[0])"
                />
              </div>
              {this.state.avatarProduct === '' ? null :
                <img className="borderImgSize" src={this.state.avatarProduct} />
              }
            </Form>
            <Form>
              <div>Hình ảnh Thumbnail</div>
              <div className="borderImgSizeIcon">
                <label for="upload-photo" className="iconOnImgBorder"><i className="fas fa-image fa-3x"></i></label>
                <Form.Control
                  id="upload-photo"
                  type="file"
                  accept=".png, .jpg, .svg, .jfif"
                  onChange={this.imageHandler}
                  name="imagePath"
                  oninput="pic.src=window.URL.createObjectURL(this.files[0])"
                />
              </div>
              {/* {this.state.edit ? <img className="borderImgSize" src={`http://localhost:5000/${products.imagePath}`} /> : null
                      } */}
              {this.state.edit ? null : this.state.listImage.map((image, idx) => {
                return (
                  <img key={idx} className="borderImgSize" src={image} />
                );
              })}
            </Form>
            <Button variant="primary" onClick={() => this.saveImageProduct(this.state.idOnModalCreateImg)}>
              Thêm
                </Button>
          </Form>
        </Modal.Body>
      </Modal>
        </>

      <>
        <CRow>
          <CCol>
            <CCard>
              <CCardHeader>
                <p className="fontSizeNameTable">Danh sách sản phẩm</p>
              </CCardHeader>
              <CCardBody>
                <Table striped hover>
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Image</th>
                      <th>Product Code</th>
                      <th>Name Product</th>
                      <th>Color</th>
                      <th>Brand</th>
                      <th>Category</th>
                      <th>Size</th>
                      <th>Price</th>

                      <th>Action</th>
                    </tr>
                  </thead>

                  {/* Show danh sách các sản phẩm */}
                  <tbody>
                    {this.state.listProduct.map((listProduct, idx) => {
                      return (
                        <tr key={idx}>
                          <td>{idx + 1}</td>

                          <td>
                            {listProduct.image !== null ?
                              <td>
                                <img
                                  className="borderImgSizeAvatar"
                                  src={listProduct.image}
                                />
                              </td> :
                              <td>
                                Null
                                   </td>
                            }
                          </td>

                          <td>{listProduct.code}</td>
                          <td>{listProduct.name}</td>
                          <td>{listProduct.color}</td>
                          <td>{this.getNameBrand(listProduct.brandCode)}</td>
                          <td>{this.getNameCategory(listProduct.categoryCode)}</td>
                          <td><div className="view" onClick={() => this.setShowModalViewSizeProduct(listProduct.code)}>View all size</div></td>
                          <td>{formatter.format(listProduct.sellPrice)}</td>
                          <td>
                            <Button
                              size="sm"
                              onClick={() => this.setShowModalEdit(listProduct.code)}
                              color="success"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{ width: "20px", height: "20px", color: "#fff" }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                            </Button>

                            <Button
                              size="sm"
                              className="bv"
                              onClick={() => this.delete(listProduct.code)}
                              color="danger"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                style={{ width: "20px", height: "20px", color: "#fff" }}
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                ></path>
                              </svg>
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </>
      </div >

    );
  }
  imageHandler = (event) => {
    // const { name } = event.target;
    const reader = new FileReader()
    reader.onload = () => {
      if (reader.readyState === 2) {
        this.state.listImage.push(reader.result);
        this.realTime();    //Cập nhật state ngay lập tức
      }
    }
    // const newProduct = {...this.state.products, [name]: event.target.files[0] } // ... là clone tat ca thuoc tinh cua major có qua thuộc tính mới, [name] lấy cái name đè lên name của tồn tại nếu k có thì thành 1 cái field mới
    // this.setState({products: newProduct });
    // console.log(this.state.products)
    this.state.listImageToApi.push(event.target.files[0])
    this.realTime();    //Cập nhật state ngay lập tức
    // this.setState({tempImage: true})s
    console.log(this.state.listImage)
    console.log(this.state.listImageToApi)
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
        this.realTime();    //Cập nhật state ngay lập tức
      }
    }
    this.state.avatarProductSaveAPI.push(event.target.files[0])
    this.realTime();    //Cập nhật state ngay lập tức
    console.log(this.state.avatarProductSaveAPI)
    reader1.readAsDataURL(event.target.files[0])
  }
}
export default Products;