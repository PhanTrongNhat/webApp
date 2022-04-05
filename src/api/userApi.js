import axiosClient from "./axiosClient";
const UserApi = {
  postUser: (data) => {
    const url = "/api/Authenticate/Login";
    return axiosClient.post(url, data);
  },
  registerUser: (data) => {
    const url = "/api/Authenticate/RegisterCustomer";
    return axiosClient.post(url, data);
  },
  updateInfor: (data) => {
    const url = "/api/khachhang/suathongtin";
    return axiosClient.post(url, data);
  },
};

export default UserApi;
