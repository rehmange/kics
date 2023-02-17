import axios from "axios";
import {Form, Col,Button }from 'react-bootstrap'
import { useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";

const Login = () => {
  const { loading, error, dispatch } = useContext(AuthContext);
  const navigate = useNavigate()
  const handleClick = async (e) => {
    console.log('hadleclikeds')
    e.preventDefault();
    dispatch({ type: "LOGIN_START" });
    try {
      // const res = await axios.post(`${process.env.REACT_APP_BACKEND_URL}auth/login`, {
      const res = await axios.post(`/api/auth/login`, {
        email:e.target.email.value,
        password:e.target.password.value
      });
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data.details });
      navigate("/")
    } catch (err) {
      dispatch({ type: "LOGIN_FAILURE", payload: err.response.data });
    }
  };
  function click() {
    const togglePassword = document.querySelector("#togglePassword");
    const passwordV = document.querySelector("#password_field");
         const type = passwordV.getAttribute("type") === "password" ? "text" : "password";
    togglePassword.className === 'fa fa-eye viewpass mr-4 text-muted' ? document.getElementById("togglePassword").className = 'fa fa-eye-slash viewpass mr-4 text-muted' : document.getElementById("togglePassword").className = 'fa fa-eye viewpass mr-4 text-muted';
    passwordV.setAttribute("type", type);
}


  return (
    <div className="loginWrapper">
      <div className="signText">
        <span>Sign in</span>
      </div>
          <Form onSubmit={handleClick}>
                <Form.Group as={Col} md="12" controlId="validationCustom03">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email address"
                required
                name="email"
              />
              <Form.Control.Feedback type="invalid">
                Email is invalid
              </Form.Control.Feedback>
            </Form.Group>
                <Form.Group as={Col} md="12" controlId="validationCustom03" className="mt-1">
              <Form.Label>password</Form.Label>
              <Form.Control
                type="password" 
                placeholder="Enter your Password"
                required
                name="password"
                id="password_field"
              />
              <Form.Control.Feedback type="invalid">
                Password is invalid
              </Form.Control.Feedback>
            </Form.Group>
            <span className="fa fa-eye-slash viewpass mr-4 text-muted" onClick={click} id="togglePassword"></span>
            <Button variant="success"  md="12" className="mt-3" disabled={loading}  type="submit">
               Login
              </Button>
    </Form>
    {error && <span>{error.message}</span>}
    </div>
  );
};

export default Login;
