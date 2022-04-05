import React, { useState, useEffect } from "react";
import classnames from "classnames";
// import { useDispatch} from "react-redux";
// import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import userDefaut from "../../assets/user.png";

import {
  Button,
  Form,
  Col,
  Container,
  Row,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
  Table,
  ModalHeader,
  Modal,
  ModalFooter,
  ModalBody,
  Card,
  CardTitle,
  CardText,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  DropdownToggle,
} from "reactstrap";
import ModeFeedback from "./modalFeedback";
import Avatar from "react-avatar";
import Cookies from "js-cookie";
import "../../css/profile.css";
import orderStatusApi from "../../api/orderStatusApi";
import FeedbackApi from "../../api/feedbackApi";
import orderApi from "../../api/orderApi";
import UserApi from "../../api/userApi";
// import { signOut } from "../../redux/auth";
// import { get } from "@reduxjs/toolkit/node_modules/immer/dist/internal";

const Profile = (Props) => {
  // const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("1");
  const [activeTab1, setActiveTab1] = useState("1");
  const [idOrder, setIdOrder] = useState();
  const [listTrangThai, setListTrangThai] = useState([]);
  const userInfor = JSON.parse(Cookies.get("userInfor"));
  const [listOrder, setListOrder] = useState();
  const [showDetaiOrder, setShowDetaiOrder] = useState(false);
  const [listDetaiOrder, setlistDetaiOrder] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [dropdownOpen, setdropdownOpen] = useState(false);
  const [diem, setDiem] = useState(5);
  const [Feedback, setFeedback] = useState("");
  const [option, setOption] = useState("1");
  const [checkFeedback, setcheckFeedback] = useState(0);
  const [isEdit, setIsEdit] = useState(false);

  const [change, setChange] = useState({
    status: "",
    currentPage: 1,
    keyword: "",
  });
  console.log(1);
  if (!userInfor) {
    Props.history.push("/signin");
  }
  console.log(userInfor);
  const [hoTen, setHoTen] = useState(userInfor?.HoTen);
  const [ngaySinh, setNgaySinh] = useState(userInfor?.NgaySinh);
  const [sdt, setsdt] = useState(userInfor?.SDT);
  const [gioiTinh, setGioiTinh] = useState(userInfor?.GioiTinh);
  // useEffect(() => {
  //   setHoTen(userInfor?.HoTen);
  //   setNgaySinh(userInfor?.NgaySinh);
  //   setsdt(userInfor?.SDT);
  //   setGioiTinh(userInfor?.GioiTinh);
  // }, [userInfor]);

  const listDiem = [1, 2, 3, 4, 5];
  const logout = () => {
    Cookies.remove("userInfor");
    Props.history.push("/signin");
  };
  const handleDetailorder = async (id) => {
    setIdOrder(id);
    const list = await orderApi.getDetailOrder(id);
    console.log(list.data);
    setlistDetaiOrder(list.data);
    setShowDetaiOrder(true);
  };
  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };
  const toggle1 = (tab) => {
    if (activeTab1 !== tab) setActiveTab1(tab);
  };
  useEffect(() => {
    try {
      const fectList = async () => {
        const listTT = await orderStatusApi.getAll();

        const ListOrder = await orderApi.getOrderByIdKhachHang(userInfor.Id);

        setListOrder(ListOrder.data);

        console.log("da", listTT.data.reverse());
        listTT.data.unshift({ id: 0, ten: "Tất cả" });

        setListTrangThai(listTT.data);
      };
      fectList();
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleOption = async (index, value) => {
    console.log(index, value);
    setOption(index);
    setChange({ ...change, status: value });

    if (value === 0) {
      const ListOrder = await orderApi.getOrderByIdKhachHang(userInfor.Id);
      setListOrder(ListOrder.data);
    } else {
      const fetchListDHId = await orderApi.getOrderByIdKHandStatus({
        idUser: userInfor.Id,
        idTT: value,
      });
      console.log(fetchListDHId);
      if (fetchListDHId.data === "") {
        setListOrder([]);
      } else {
        setListOrder(fetchListDHId.data);
      }
    }
  };

  const handleFeedback = async (data) => {
    try {
      console.log("data", data);
      if (data.noiDung === "") {
        toast.warning("vui lòng nhập đánh giá!");
      } else {
        const postFeedback = await FeedbackApi.feedback(data);
        toast.success("Đánh giá thành công!");
        setShowModal(!setShowModal);
      }
    } catch (error) {
      toast.warning("Đánh giá không thành công!");
    }

    // setShowModal(!showModal);
  };
  const handleShowModal = async (item) => {
    try {
      console.log(item);
      const temp = await FeedbackApi.CheckfeedbackOrder(item);
      console.log("temp", temp);
      setcheckFeedback(temp);
      if (temp === 3) {
        toast.warning("đơn hàng đã đánh giá cho shipper và cửa hàng!");
      } else if (checkFeedback) {
        if (temp === 1) {
          toggle1("2");
        } else {
          toggle1("1");
        }

        setShowModal(!showModal);
      } else {
        setShowModal(!showModal);
      }
    } catch (err) {
      console.log(err);
    }

    //
  };
  const handleSetDiem = (item) => {
    setDiem(item);
    console.log("diem", item);
  };
  const updateInfor = async (data) => {
    console.log("infor", sdt, hoTen, gioiTinh);
    try {
      await UserApi.updateInfor({
        userId: userInfor.Id,
        gioiTinh: data.gioiTinh,
        sdt: data.sdt,
        hoTen: data.hoTen,
      });
      setIsEdit(!isEdit);
    } catch (error) {}
  };
  return (
    <Container className="content">
      <ToastContainer />
      <Button color="success" onClick={() => logout()}>
        Đăng xuất
      </Button>
      <div className="profile">
        <h2>
          <b>Tài khoản của bạn</b>
        </h2>

        <div>
          <Row>
            <Col sm="2" lg="2">
              <div className="group_user">
                <img
                  src={userDefaut}
                  style={{ minWidth: "20%", maxWidth: "20%" }}
                />
                <h3>
                  <b>{userInfor ? userInfor.username : ""}</b>
                </h3>
              </div>
              <Nav tabs vertical>
                <NavItem title="Quản lý đơn hàng">
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    Quản lí tài khoản
                  </NavLink>
                </NavItem>
                <NavItem title="Thông tin tài khoản">
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    Quản lí đơn hàng
                  </NavLink>
                </NavItem>
              </Nav>
            </Col>
            <Col sm="10" lg="10">
              <TabContent activeTab={activeTab}>
                <TabPane tabId="1">
                  <Row>
                    <Col className="Quan_Ly_Tai_Khoan">
                      <div>
                        <h3>Tên tài khoản</h3>
                        <h4>
                          {userInfor?.username ? ":" + userInfor.username : ":"}
                        </h4>
                      </div>
                      <div>
                        <h3>Email</h3>
                        <h4>{userInfor?.email ? ":" + userInfor.email : ""}</h4>
                      </div>

                      <div>
                        <h3>Số điện thoại</h3>
                        <h4>
                          {":"}
                          {isEdit ? (
                            <input
                              style={{ width: "200px" }}
                              type="text"
                              required
                              value={sdt}
                              onChange={(e) => setsdt(e.target.value)}
                            ></input>
                          ) : (
                            sdt
                          )}
                        </h4>
                      </div>
                      <div>
                        <h3>Họ Tên</h3>
                        <h4>
                          {":"}
                          {isEdit ? (
                            <input
                              style={{ width: "200px" }}
                              type="text"
                              required
                              value={hoTen}
                              onChange={(e) => setHoTen(e.target.value)}
                            ></input>
                          ) : (
                            hoTen
                          )}
                        </h4>
                      </div>
                      {/* <div>
                        <h3>Ngày Sinh</h3>
                        {":"}
                        {isEdit ? (
                          <input
                            type="text"
                            required
                            value={gioiTinh}
                            onChange={(e) => setHoTen(e.target.value)}
                          ></input>
                        ) : (
                          gioiTinh
                        )}
                      </div> */}
                      <div>
                        <h3>Giới tính</h3>
                        <h4>
                          {":"}
                          {isEdit ? (
                            <input
                              style={{ width: "200px" }}
                              type="text"
                              required
                              value={gioiTinh}
                              onChange={(e) => setGioiTinh(e.target.value)}
                            ></input>
                          ) : (
                            gioiTinh
                          )}
                        </h4>
                      </div>
                      {/* <div>
                        <h4>
                          <b>{userInfor?.GioiTinh ? userInfor.GioiTinh : ""}</b>
                        </h4>
                      </div> */}
                      {/* <p>
                        {" "}
                        <i className="fas fa-map-marker-alt"></i>
                      </p> */}
                      {isEdit ? (
                        <Button
                          color="success"
                          onClick={() => updateInfor({ sdt, hoTen, gioiTinh })}
                          className="profile-buttonEdit"
                        >
                          Cập nhật thông tin
                        </Button>
                      ) : (
                        ""
                      )}
                      <Button
                        onClick={() => setIsEdit(!isEdit)}
                        className="profile-buttonEdit"
                      >
                        Chỉnh sửa thông tin
                      </Button>
                      <br></br>
                    </Col>
                  </Row>
                </TabPane>
                <TabPane tabId="2">
                  <Row className="quan_li_tai_khoan">
                    {showDetaiOrder ? (
                      <div>
                        <Button
                          onClick={() => {
                            setShowDetaiOrder(false);
                          }}
                          outline
                          style={{
                            padding: "7px",
                            backgroundColor: "#69D84F",
                            color: "white",
                          }}
                        >
                          Trở lại
                        </Button>
                        <h3>ID ĐƠN HÀNG:{idOrder}</h3>
                        <Table>
                          <thead>
                            <tr>
                              <th>#</th>
                              <th>Sản phẩm</th>
                              <th>Đơn Giá</th>
                              <th>Số lượng</th>
                              <th>Tổng</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listDetaiOrder
                              ? listDetaiOrder.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <th scope="row">{index}</th>
                                      <td>{item.sanPhamId}</td>
                                      <td>${item.donGia}</td>

                                      <td>{item.soLuong}</td>
                                      <td>{item.soLuong * item.donGia}</td>
                                    </tr>
                                  );
                                })
                              : ""}
                          </tbody>
                        </Table>
                      </div>
                    ) : (
                      <div>
                        <ul className="list_quan_li_tai_khoan">
                          {listTrangThai?.map((item, index) => {
                            return (
                              <li key={index}>
                                <button
                                  onClick={() =>
                                    handleOption(`${index + 1}`, item.id)
                                  }
                                  value={item.value}
                                >
                                  <p
                                    className={`${
                                      option === `${index + 1}`
                                        ? "active status_name"
                                        : "status_name"
                                    }`}
                                  >
                                    {item.ten}
                                  </p>
                                </button>
                              </li>
                            );
                          })}
                        </ul>

                        <Table>
                          <thead>
                            <tr>
                              <th>Id</th>
                              <th>Đơn hàng</th>
                              <th>Tổng tiền</th>
                              <th>Thời gian đặt hàng</th>
                              <th>Trạng thái đơn hàng</th>
                              <th>Xem chi tiết</th>
                              <th>Đánh giá</th>
                            </tr>
                          </thead>
                          <tbody>
                            {listOrder
                              ? listOrder.map((item, index) => {
                                  return (
                                    <tr key={index}>
                                      <th scope="row">{item.id}</th>
                                      <td>Jacob</td>
                                      <td>${item.tongTien}</td>
                                      <td>{item.ngayMuaHang}</td>
                                      <td>{item.trangThaiDonHang.ten}</td>
                                      <td>
                                        <Button
                                          onClick={() => {
                                            handleDetailorder(item.id);
                                          }}
                                          style={{
                                            padding: "7px",
                                            backgroundColor: "#69D84F",
                                          }}
                                        >
                                          Xem chi tiết
                                        </Button>
                                      </td>
                                      <td>
                                        <div>
                                          {item.trangThaiDonHang.id === 5 ? (
                                            <Button
                                              color="danger"
                                              onClick={() => {
                                                handleShowModal(item.id);
                                              }}
                                              style={{
                                                padding: "7px",
                                                backgroundColor: "#69D84F",
                                              }}
                                            >
                                              Đánh giá
                                            </Button>
                                          ) : (
                                            ""
                                          )}

                                          <Modal
                                            toggle={() => {
                                              setShowModal(!showModal);
                                            }}
                                            isOpen={showModal}
                                          >
                                            <ModalHeader
                                              toggle={() => {
                                                setShowModal(!showModal);
                                              }}
                                            >
                                              Đánh giá đơn hàng #{item.id}
                                            </ModalHeader>
                                            <ModalBody>
                                              <div>
                                                <Nav tabs>
                                                  <NavItem>
                                                    <NavLink
                                                      className={classnames({
                                                        active:
                                                          activeTab1 === "1",
                                                      })}
                                                      onClick={() => {
                                                        setFeedback("");
                                                        if (
                                                          checkFeedback == 1
                                                        ) {
                                                          toast.warning(
                                                            "đơn hàng đã đánh giá cửa hàng!"
                                                          );
                                                        } else {
                                                          toggle1("1");
                                                        }
                                                      }}
                                                    >
                                                      Cửa hàng
                                                    </NavLink>
                                                  </NavItem>
                                                  <NavItem>
                                                    <NavLink
                                                      className={classnames({
                                                        active:
                                                          activeTab1 === "2",
                                                      })}
                                                      onClick={() => {
                                                        setFeedback("");
                                                        if (
                                                          checkFeedback == 2
                                                        ) {
                                                          toast.warning(
                                                            "đơn hàng đã đánh giá shipper!"
                                                          );
                                                        } else {
                                                          toggle1("2");
                                                        }
                                                      }}
                                                    >
                                                      Shipper
                                                    </NavLink>
                                                  </NavItem>
                                                </Nav>
                                                <TabContent
                                                  activeTab={activeTab1}
                                                >
                                                  <TabPane tabId="1">
                                                    <Row>
                                                      <Col sm="3">
                                                        Chọn sao:
                                                      </Col>
                                                      <Col sm="9">
                                                        <div className="d-flex  p-2">
                                                          <Dropdown
                                                            isOpen={
                                                              dropdownOpen
                                                            }
                                                            toggle={() => {
                                                              setdropdownOpen(
                                                                !dropdownOpen
                                                              );
                                                            }}
                                                          >
                                                            <DropdownToggle
                                                              caret
                                                            >
                                                              {diem}
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                              {listDiem?.map(
                                                                (
                                                                  item,
                                                                  index
                                                                ) => {
                                                                  return (
                                                                    <DropdownItem
                                                                      key={
                                                                        index
                                                                      }
                                                                      onClick={() => {
                                                                        handleSetDiem(
                                                                          item
                                                                        );
                                                                        setDiem(
                                                                          item
                                                                        );
                                                                      }}
                                                                    >
                                                                      {item}
                                                                    </DropdownItem>
                                                                  );
                                                                }
                                                              )}
                                                            </DropdownMenu>
                                                          </Dropdown>
                                                        </div>
                                                      </Col>
                                                      <Col
                                                        size="3"
                                                        style={{
                                                          padding: "1rem",
                                                        }}
                                                      >
                                                        Nhận xét:
                                                      </Col>
                                                      <Col
                                                        size="9"
                                                        style={{
                                                          padding: "1rem",
                                                        }}
                                                      >
                                                        <textarea
                                                          className="input-feedback"
                                                          placeholder="Nhập đánh giá cửa hàng"
                                                          onChange={(e) =>
                                                            setFeedback(
                                                              e.target.value
                                                            )
                                                          }
                                                          value={Feedback}
                                                        ></textarea>
                                                        {/* <input
                                                          className="input-shipping"
                                                          id="fullname"
                                                          type="text"
                                                          placeholder="Nhập đánh giá cửa hàng"
                                                          value={Feedback}
                                                          onChange={(e) =>
                                                            setFeedback(
                                                              e.target.value
                                                            )
                                                          }
                                                          required
                                                        ></input> */}
                                                      </Col>
                                                    </Row>
                                                  </TabPane>
                                                  <TabPane tabId="2">
                                                    <Row>
                                                      <Col sm="3">
                                                        Chọn sao:
                                                      </Col>

                                                      <Col sm="9">
                                                        <div className="d-flex  p-2">
                                                          <Dropdown
                                                            isOpen={
                                                              dropdownOpen
                                                            }
                                                            toggle={() => {
                                                              setdropdownOpen(
                                                                !dropdownOpen
                                                              );
                                                            }}
                                                          >
                                                            <DropdownToggle
                                                              caret
                                                            >
                                                              {diem}
                                                            </DropdownToggle>
                                                            <DropdownMenu>
                                                              {listDiem?.map(
                                                                (
                                                                  item,
                                                                  index
                                                                ) => {
                                                                  return (
                                                                    <DropdownItem
                                                                      key={
                                                                        index
                                                                      }
                                                                      onClick={() => {
                                                                        handleSetDiem(
                                                                          item
                                                                        );
                                                                      }}
                                                                    >
                                                                      {item}
                                                                    </DropdownItem>
                                                                  );
                                                                }
                                                              )}
                                                            </DropdownMenu>
                                                          </Dropdown>
                                                        </div>
                                                      </Col>
                                                      <Col
                                                        size="3"
                                                        style={{
                                                          padding: "1rem",
                                                        }}
                                                      >
                                                        Nhận xét:
                                                      </Col>
                                                      <Col
                                                        size="9"
                                                        style={{
                                                          padding: "1rem",
                                                        }}
                                                      >
                                                        <textarea
                                                          className="input-feedback"
                                                          placeholder="Nhập đánh giá shipper"
                                                          onChange={(e) =>
                                                            setFeedback(
                                                              e.target.value
                                                            )
                                                          }
                                                          value={Feedback}
                                                        ></textarea>
                                                        {/* <input
                                                          className="input-shipping"
                                                          id="fullname"
                                                          type="text"
                                                          placeholder="nhập đánh giá shipper"
                                                          value={Feedback}
                                                          onChange={(e) =>
                                                            setFeedback(
                                                              e.target.value
                                                            )
                                                          }
                                                          required
                                                        ></input> */}
                                                      </Col>
                                                    </Row>
                                                  </TabPane>
                                                </TabContent>
                                              </div>
                                            </ModalBody>
                                            <ModalFooter>
                                              <Button
                                                // style={{
                                                //   padding: "7px",
                                                //   backgroundColor: "#69D84F",
                                                // }}
                                                color="success"
                                                onClick={() => {
                                                  handleFeedback({
                                                    donHangId: item.id,
                                                    LoaiDGId: activeTab1,
                                                    noiDung: Feedback,
                                                    soDiem: diem,
                                                  });
                                                }}
                                              >
                                                Nhận xét
                                              </Button>{" "}
                                              {/* <Button
                                                onClick={() => {
                                                  setShowModal(!showModal);
                                                }}
                                              >
                                                Cancel
                                              </Button> */}
                                            </ModalFooter>
                                          </Modal>
                                        </div>
                                      </td>
                                    </tr>
                                  );
                                })
                              : ""}
                          </tbody>
                        </Table>
                      </div>
                    )}
                  </Row>
                </TabPane>
              </TabContent>
            </Col>
          </Row>
        </div>

        {/* <Row>
          <Col>
            <Avatar
              className="profile-avatar"
              name={userInfor ? userInfor.username : ""}
              // src="https://image.thanhnien.vn/1024/uploaded/haoph/2021_03_06/img_0467_lsvb.jpg"
              round={true}
              size="100%"
            />
          </Col>
          <Col>
            <hr />
            <h3>
              <b>{userInfor ? userInfor.username : ""}</b>
            </h3>
            <p>Student</p>
            <p>
              {" "}
              <i className="fas fa-map-marker-alt"></i> Binh Dinh
            </p>
            <Button onClick={() => logout()} className="profile-buttonLogout">
              <h6>Logout</h6>
            </Button>
          </Col>
        </Row> */}
      </div>
      <hr></hr>
    </Container>
  );
};

export default Profile;
