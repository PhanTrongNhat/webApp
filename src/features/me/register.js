// import firebase from "firebase";
import React, { useState, useEffect } from "react";
// import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
// import { useDispatch } from "react-redux";

import {
  Button,
  Col,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
} from "reactstrap";
import logo from "../../assets/logo192.png";
// import { signIn } from "../../redux/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import loginApi from "../../api/userApi";
import Cookies from "js-cookie";
import ShipperImgae from "../../assets/Shipper.png";
// const uiConfig = {
//   // Popup signin flow rather than redirect flow.
//   signInFlow: "redirect",
//   signInSuccessUrl: "/",
//   // We will display Google and Facebook as auth providers.
//   signInOptions: [
//     firebase.auth.GoogleAuthProvider.PROVIDER_ID,
//     //firebase.auth.FacebookAuthProvider.PROVIDER_ID
//   ],
// };
const Signin = (Props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [checkPassword, setCheckPassword] = useState("");
  const [email, setEmail] = useState("");
  // const dispatch = useDispatch();
  const redirect = Props.location.search
    ? Props.location.search.split("=")[1]
    : "/profile";

  const userInfor = Cookies.get("userInfor");

  useEffect(() => {
    if (userInfor) {
      Props.history.push(redirect);
    }
  }, [Props.history, redirect, userInfor]);
  //const { userInfor } = userSignin;
  // useEffect(() => {
  //   if (userInfor) {
  //     Props.history.push(redirect);
  //   }
  // }, [Props.history, redirect, userInfor]);

  const submit = async (infor) => {
    try {
      if (checkPassword === password && checkPassword && password) {
        // const params = { _page: 1, _limit: 10 };
        const data = await loginApi.registerUser(infor);

        // localStorage.setItem("userInfor", JSON.stringify(data));
        //console.log(localStorage.getItem('userInfor'));

        if (data) {
          Cookies.set(JSON.stringify(data));
          // dispatch(signIn());
          toast.success("Đăng ký tài khoản thành công!");
          const settime = () => {
            const settimeout = setTimeout(() => {
              console.log("settimeout");
            }, 2000);
            return clearInterval(settimeout);
          };

          settime();

          Props.history.push("/signin");
        } else {
          toast.warning("Đăng ký tài khoản thất bại!");
        }
      } else {
        toast.warning("Không khớp mật khẩu!");
      }

      // console.log("Fetch products successfully: ", response.data);
    } catch (error) {
      console.log("Failed to login: ", error);
    }
    //dispatch(signIn(infor));
  };
  return (
    <div className="content">
      <ToastContainer />
      <Row>
        <Col className="image_Shipper" sm="5" md="6" lg="7">
          <img className="image_Shipper_img" src={ShipperImgae}></img>
        </Col>
        <Col sm="7" md="6" lg="5">
          <div className="login">
            <div className="login-logo">
              <img
                style={{ height: "5rem", width: "5rem" }}
                src={logo}
                alt="logo"
              />
            </div>
            <h2>Đăng ký</h2>
            <hr />
            <Form>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="exampleEmail"
                  placeholder="Nhập email"
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="exampleEmail">Tên tài khoản</Label>
                <Input
                  type="text"
                  name="username"
                  id="exampleEmail"
                  placeholder="Nhập tên tài khoản"
                  onChange={(event) => setUsername(event.target.value)}
                  required
                />
              </FormGroup>{" "}
              <FormGroup>
                <Label for="examplePassword">Mật khẩu</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Nhập mật khẩu"
                  onChange={(event) => setPassword(event.target.value)}
                  required
                />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Xác nhận mật khẩu</Label>
                <Input
                  type="password"
                  name="password"
                  id="examplePassword"
                  placeholder="Nhập mật khẩu"
                  onChange={(event) => setCheckPassword(event.target.value)}
                  required
                />
              </FormGroup>
              <Button
                color="success"
                onClick={() => submit({ username, password, email })}
              >
                {" "}
                <b>Đăng ký</b>
              </Button>{" "}
              {/* <StyledFirebaseAuth
                uiConfig={uiConfig}
                firebaseAuth={firebase.auth()}
              /> */}
            </Form>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Signin;
