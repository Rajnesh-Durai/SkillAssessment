import React,{useState} from "react";
import QuoteImage from '../../assets/qoute.png';
import Mask from '../../assets/Mask group.png';
import Group from '../../assets/Group 5784.png';
import Logo from '../../assets/logo.png';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  const [logedData, setLoginData] = useState({});
  const handlePasswordChange = (event) => {
    let value = event.target.value;
    if (event.clipboardData && event.clipboardData.getData) {
      value = event.clipboardData.getData('Text');
    }
    setPassword(value);
    setIsValid(validatePassword(value));
  };
  const validatePassword = (value) => {
    const minLength = 8;
    let isValid = true;
    const newErrors = {};
    if (!value) {
      newErrors.password = 'Password is required';
      isValid = false;
    } else if (value.length < minLength) {
      newErrors.password = `Password must be at least ${minLength} characters long`;
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;
    if (!email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email is invalid';
      isValid = false;
    }
    if (!password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
    }
  };
  const logindata = () => {
    const loginuser = {
      email: email,
      password: password,
      role: 'Admin'
    }
    console.log(loginuser)
  }
  return (
    <div>
      <div className="wrapper">
        <div className="backgrounds">
          <div className="leftcol">
            <div className="middlebanner">
              <img
                src={QuoteImage}
                alt="middlebanner"
                height="58px"
                width="58px"
              />
            </div>
            <p className="mainhead">Helps You To Evaluate Skills</p>
            <p className="subheads">Kanini Evaluation Platform</p>
          </div>
          <div>
            <img src={Mask} className="topbanner" alt="topbanner" />
          </div>
          <div className="btmbanner">
            <img src={Group} className="bottombanner" alt="bottombanner" />
          </div>
        </div>
        <div className="valid px-5">
          <form onSubmit={handleSubmit}>
            <div>
              <img src={Logo} alt="logo" className="logo" />
            </div>
            <br />
            <div className="forms">
              <h3 className="text1">Sign In</h3>
              <p className="text">
                Welcome back! Please enter email id and password
              </p>
              <label className="text2" htmlFor="email">
                Email ID
              </label>
              <br />
              <input
                type="email"
                className="input"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <br />
              {errors.email && <span className="error">{errors.email}</span>}
              <br /> <br />
              <label className="text2" htmlFor="password">
                Password
              </label>
              <br />
              <div className="inputPassword-wrapper">
                <input
                  type="password"
                  className="input"
                  id="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
                <br />
                {errors.password && (
                  <span className="error">{errors.password}</span>
                )}
                {isValid && <p>Password is valid</p>}
              </div>
              <br /> <br />
              <button className="btns" type="submit" onClick={logindata}>
                <a className="signin">SIGN IN</a>
              </button>
              <br />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
