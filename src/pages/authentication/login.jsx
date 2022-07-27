import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";
import {
  Password,
  SignIn,
  EmailAddress,
  RememberPassword,
  ForgotPassword,
  CreateAccount,
} from "../../constant";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import config from "../../config";
import customAxios from "../../customAxios";
import Swal from 'sweetalert2'

const Logins = (props) => {
  const dispatch = useDispatch();
  const token = useSelector((state) => {
    console.log("state", state);
    return state.Customizer.token;
  }) 

  const [togglePassword, setTogglePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      navigate(`${process.env.PUBLIC_URL}/dashboard/default/Dubai`);
    }
  }, []);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let url = `${config.url}/auth/login`;
      let res = await customAxios.post(url, {
        email: email,
        password: password,
      });
      if (res.data.success === 1) {
        dispatch({ type: "SET_TOKEN", payload: { token: res.data.token } });
        localStorage.setItem("token", res.data.token);
        enqueueSnackbar(res.data.msg, { variant: "success" });
        navigate(`${process.env.PUBLIC_URL}/dashboard/default/Dubai`);
      } else if (res.data.success !== 1) {
        enqueueSnackbar(res.data.msg, { variant: "error" });
      } else {
        enqueueSnackbar("an error occurred");
      }
    } catch (err) {
      enqueueSnackbar(err.toJSON()["message"]);
      console.log(err);
    }
  };

  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  return (
    <Container fluid={true} className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="#javascript">
                  <img
                    className="img-fluid for-light"
                    src={require("../../assets/images/logo/login.png")}
                    alt=""
                  />
                  <img
                    className="img-fluid for-dark"
                    src={require("../../assets/images/logo/logo_dark.png")}
                    alt=""
                  />
                </a>
              </div>
              <div className="login-main login-tab">
                <Form className="theme-form">
                  <h4>{"Sign In "}</h4>
                  <p>{"Enter your email & password to login"}</p>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      className="form-control"
                      type="email"
                      required=""
                      placeholder="Test@gmail.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </FormGroup>
                  <div className="mb-3 position-relative">
                    <Label className="col-form-label">{Password}</Label>
                    <Input
                      className="form-control"
                      type={togglePassword ? "text" : "password"}
                      name="login[password]"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required=""
                      placeholder="*********"
                    />
                    <div
                      className="show-hide"
                      onClick={() => HideShowPassword(togglePassword)}
                    >
                      <span className={togglePassword ? "" : "show"}></span>
                    </div>
                  </div>
                  <div className="login-btn mb-0">
                    <div className="checkbox ms-3">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <a
                      className="link"
                      href="#javascript"
                      onClick={() => {
                        navigate(
                          `${process.env.PUBLIC_URL}/forgotPasswordEnterNumber`
                        );
                      }}
                    >
                      {ForgotPassword}
                    </a>

                    <Button color="primary" onClick={handleSubmit}>
                      {SignIn}
                    </Button>
                  </div>
                  <p className="mt-4 mb-0">
                    {"Don't have account?"}
                    <a
                      className="ms-2"
                      href="#javascript"
                      onClick={() => {
                        navigate(`${process.env.PUBLIC_URL}/Register`);
                      }}
                    >
                      {CreateAccount}
                    </a>
                  </p>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Logins;
