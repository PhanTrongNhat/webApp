import axios from "axios";
import md5 from "md5";
const LOADDATA = "LOADDATA";
//function
const setData = async (data) =>
  await axios
    .post("https://2g8ge.sse.codesandbox.io/user", data)
    .catch((error) => {
      console.log(error);
    });
let initState = {
  username: "",
  password: "",
  name: "",
  cart: {},
  signin: false,
};
//action
export const loadData = () => async (dispatch) => {
  const res = await axios.get("https://2g8ge.sse.codesandbox.io/user");
  dispatch({ type: LOADDATA, payload: res.data });
};

export const signIn = (infor) => {
  return {
    type: "SIGN_IN",
    payload: infor,
  };
};

export const signOut = () => {
  return {
    type: "SIGN_OUT",
  };
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOADDATA:
      return {
        ...state,
        ...action.payload,
      };
    case "SIGN_IN":
      console.log(1);
      if (
        state.password === md5(action.payload.password) &&
        state.username === action.payload.username
      ) {
        setData({ ...state, signin: true });
        return {
          ...state,
          signin: true,
        };
      } else {
        alert("userName or password incorrect!");
        return {
          ...state,
          signin: false,
        };
      }
    case "SIGN_OUT":
      setData({ ...state, signin: false });
      return {
        ...state,
        signin: false,
      };
    default: {
      return state;
    }
  }
};
export default reducer;
