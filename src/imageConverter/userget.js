import axios from "axios";
const getUser = (token) => {
    axios({
      method: "get",
      url: "http://localhost:5600/instagram/v1/user/find",
      headers:token,
    }).then( (res) => {
        const data = res.data.users
        return data;
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  export default getUser;