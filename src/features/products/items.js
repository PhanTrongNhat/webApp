import { useDispatch } from "react-redux";
import {
  Col,
  Container,
  Row,
  InputGroup,
  Input,
  InputGroupText,
  DropdownToggle,
  DropdownItem,
  Dropdown,
  DropdownMenu,
  FormGroup,
  Label,
} from "reactstrap";
import "../../css/content.css";
import Item from "./item";
import React, { useEffect, useState } from "react";
import productApi from "../../api/productApi";
import { setData } from "../../redux/products";
import LoadingBox from "../../components/loadingBox";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import StoreApi from "../../api/storeApi";
import CarouselImage1 from "../../assets/di-cho-thue.jpg";
import CarouselImage2 from "../../assets/images.png";
import { useLocation } from "react-router-dom";
import ListLeftMoney from "./ListLeftMoney";
import { useMediaQuery } from "react-responsive";
const Items = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [price, setPrice] = useState(40);
  const [search, setSearch] = useState();
  const [listStore, setListStore] = useState([]);
  // const [store, setStore] = useState();
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const isBigScreen = useMediaQuery({ query: "(max-width: 990px)" });
  const isSmallScreen = useMediaQuery({ query: "(max-width: 600px)" });
  const [change, setChange] = useState({
    supplier: "",
    category: "",
    price_from: 0,
    price_to: 999999,
    currentPage: 1,
    option: "",
    sort_by: "",
    sort_order: "",
    list: [],
    tags: "",
  });
  const query1 = useLocation().search;

  const query = new URLSearchParams(query1).get("name");
  // console.log("params", query);
  const [show, setShow] = useState(false);
  const [value, setValue] = useState([0, 2000000]);
  const rangeSelector = (event, newValue) => {
    setValue(newValue);
  };
  const ChangeMoney = (x) => {
    if (x === null || x === undefined) return "";
    return x.toLocaleString("vi", {
      style: "currency",
      currency: "VND",
    });
  };

  const hotels = [
    { name: "A", price: 40 },
    { name: "B", price: 50 },
    { name: "C", price: 60 },
  ];
  const hanldeMoney = async () => {
    const productPrice = await productApi.getSPbyPrice({
      from: value[0],
      to: value[1],
    });
    if (productPrice.data) {
      setProducts(productPrice.data);
    } else {
      setProducts([]);
    }
  };

  // const hanldeMoney = () => {
  //   if (isBigScreen) setShow(!show);
  //   setChange({
  //     ...change,
  //     price_from: value[0],
  //     price_to: value[1],
  //     currentPage: 1,
  //   });
  // };
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const dispatch = useDispatch();
  useEffect(() => {
    const getCuaHang = async () => {
      try {
        const getListCuaHang = await StoreApi.getAllStore();

        getListCuaHang.unshift({ UserId: 0, TenCuaHang: "Tất cả" });
        console.log("listch", getListCuaHang);
        setListStore(getListCuaHang);
        // setStore(getListCuaHang[0]);
      } catch (error) {}
    };
    getCuaHang();
  }, []);
  useEffect(() => {
    const fetchProductList = async () => {
      try {
        // const params = { _page: 1, _limit: 10 };
        if (query) {
          const response = await productApi.searchByName(query);
          // console.log("res", response);
          setLoading(true);
          setProducts(response);
          dispatch(setData(response));
        } else {
          const response = await productApi.getAll();

          setLoading(true);
          setProducts(response.data);
          dispatch(setData(response));
        }

        // console.log("Fetch products successfully: ", response.data);
      } catch (error) {
        console.log("Failed to fetch product list: ", error);
      }
    };
    fetchProductList();
  }, [query]);
  const HandleStore = async (e) => {

    try {
      // setStore(e);
      let getListCuaHang;
      console.log("e", e.target.value);
      if (e.target.value === "0") {
        getListCuaHang = await productApi.getAll();
        
      } else {
        getListCuaHang = await StoreApi.getProductByStore(e.target.value);
      }
console.log(getListCuaHang);
      if (getListCuaHang.data === "") {
        setProducts([]);
      } else {
        setProducts(getListCuaHang.data);
      }
      // console.log("data", getListCuaHang);
    } catch (error) {}
  };
  return (
    <div className="content_product">
      <Slider {...settings}>
        <div>
          <img style={{ minWidth: "100%" }} src={CarouselImage1} />
        </div>

        <div>
          <img style={{ minWidth: "100%" }} src={CarouselImage2} />
        </div>
      </Slider>
      {/* <div className="d-flex  p-5">
          <h3>Chọn cửa hàng:</h3>
          <Dropdown
            isOpen={dropdownOpen}
            toggle={() => {
              setdropdownOpen(!dropdownOpen);
            }}
          >
            <DropdownToggle
              caret
              style={{
                padding: "7px",
                backgroundColor: "#69D84F",
                color: "white",
              }}
            >
              {store?.TenCuaHang}
            </DropdownToggle>
            <DropdownMenu>
              {listStore?.map((item, index) => {
                return (
                  <DropdownItem
                    key={index}
                    onClick={() => {
                      HandleStore(item);
                    }}
                  >
                    {item.TenCuaHang}
                  </DropdownItem>
                );
              })}
            </DropdownMenu>
          </Dropdown>
          <input type="range" onInput={handleInput} />
          <h3>Price:$0 to ${price}</h3>
        </div> */}

      <Row>
        <Col sm="5" md="3" lg="2">
          <ListLeftMoney
            value={value}
            rangeSelector={rangeSelector}
            hanldeMoney={hanldeMoney}
          />
          <FormGroup onChange={(e) => HandleStore(e)} check block>
            <h5>Chọn cửa hàng</h5>
            {listStore?.map((item, index) => {
              return (
                <div key={index}>
                  <Label check>
                    <Input name="list-ch" value={item.UserId} type="radio" />{" "}
                    {item?.TenCuaHang}
                  </Label>
                </div>
              );
            })}
            {/* <div>
                <Label check>
                  <Input name="list-ncc" value={1} type="radio" /> 111
                </Label>
              </div>
              <div>
                <Label check>
                  <Input name="list-ncc" value={1} type="radio" /> 111
                </Label>
              </div>
              <div>
                <Label check>
                  <Input name="list-ncc" value={1} type="radio" /> 111
                </Label>
              </div> */}
          </FormGroup>
        </Col>
        <Col sm="7" md="9" lg="10">
          {isLoading === false ? (
            <LoadingBox />
          ) : (
            <Row>
              {products?.map((item) => (
                <Col key={item.id} md={6} sm={12} lg={3}>
                  <Item item={item}></Item>
                </Col>
              ))}
            </Row>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Items;
