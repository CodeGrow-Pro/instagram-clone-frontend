import React, { useContext, useState } from "react";
import { Grid, Link } from "@mui/material";
import login_img from "../../images/homePhone.png";
import insta_logo from "../../images/logoinsta.png";
import fb from "../../images/fb.png";
import playstore from "../../images/play.png";
import phone3 from "../../images/phone3.png";
import axios from "axios";
import "./Login.css";
import token from "../../configs/authentication";
const Login = () => {
  const [changeImg, setChangeImg] = useState(phone3);
  const [data, setData] = useState({
    data: "",
    password: "",
  });
  const handleinputs = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const handleSignin = () => {
    axios({
      method: "POST",
      url: "https://instagram-apis.onrender.com/instagram/v1/login",
      data: data,
    })
      .then((res) => {
        const token = res.data.accessToken;
        localStorage.setItem("token", token);
        localStorage.setItem("Id",res.data.userId)
            axios({
              method: "get",
              url: "https://instagram-apis.onrender.com/instagram/v1/user/find",
              headers:token,
            }).then( (res) => {
                const data = res.data.users
                 localStorage.setItem("user",JSON.stringify(data))
              })
              .catch((err) => {
                console.log(err.message);
              });
              window.location.assign('/#/home')
      })
      .catch((err) => {
        console.log(err.message);
        alert("something went wrong!");
      });
  };
  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs></Grid>
        <Grid item xs={8}>
          <div className="loginpage_main">
            <div>
              <img src={login_img} alt="loginn images" width={450} />
            </div>
            <div className="loginpage_right">
              <img className="loginpage_logo" src={insta_logo} alt="logo" />
              <img src={changeImg} className="phones" alt="phones" />
              <div className="logoinpage_signin">
                <input
                  className="loginpage_text"
                  name="data"
                  onChange={handleinputs}
                  defaultValue={data.data}
                  type="text"
                  placeholder="Phone number , username , or email"
                />
                <input
                  className="loginpage_text"
                  name="password"
                  onChange={handleinputs}
                  defaultValue={data.password}
                  type="password"
                  placeholder="Password"
                />
                <button className="login_button" onClick={handleSignin}>
                  Log in
                </button>
              </div>
              <div className="login_ordiv">
                <div className="login_space"></div>
                <div className="login_or">OR</div>
                <div className="login_space"></div>
              </div>
              <div className="login_fb">
                <Link href="#">
                  <img
                    src={fb}
                    width="20px"
                    style={{ marginRight: "5px" }}
                    alt="facebook"
                  />
                  Log in with Facebook
                </Link>
              </div>
              <div className="login_forgot">
                <Link href="#">Forgot Password ?</Link>
              </div>
              <div className="loginpage_signupoption">
                <div className="loginpage_signin">
                  Don't have an account? <Link href="/#/signup">Sign up</Link>
                </div>
                <div className="loginpage_signup">
                  Get the app .
                  <div className="loginpage_option">
                    <img
                      className="loginpage_dwimg"
                      width={136}
                      src={playstore}
                      alt="play store"
                    />
                    <img
                      className="loginpage_dwimg"
                      width={120}
                      src="https://static.cdninstagram.com/rsrc.php/v3/yu/r/EHY6QnZYdNX.png"
                      alt="app store"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs></Grid>
      </Grid>
    </div>
  );
};

export default Login;
