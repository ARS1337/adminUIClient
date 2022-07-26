import React, { useState } from "react";
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
  CreateAccount,
  YourName,
  PrivacyPolicy,
} from "../../constant";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import config from "../../config";
import { useSnackbar } from "notistack";
import customAxios from "../../customAxios";

const Register = (props) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [policyAccepted, setPolicyAccepted] = useState("");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  const handleCreateAccount = async (e) => {
    try {
      e.preventDefault();
      let res = await customAxios.post(`${config.url}/auth/createAccount`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        policyAccepted: policyAccepted,
      });
      console.log(res);
      if (res.data.success) {
        enqueueSnackbar("Account created successfully!", {
          variant: "success",
        });
        enqueueSnackbar("Redirecting to login page", { variant: "info" });
        setTimeout(() => {
          window.location.href = `${process.env.PUBLIC_URL}/login`;
        }, 1000);
      } else {
        enqueueSnackbar(res.data.msg, { variant: "info" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid={true} className="p-0">
      <Row>
        <Col xs="12">
          <div className="login-card">
            <div>
              <div>
                <a className="logo" href="#javascript">
                  <img
                    className="img-fluid for-light"
                    src={require("../../assets/images/logo/login.png")}
                    alt="looginpage"
                  />
                  <img
                    className="img-fluid for-dark"
                    src={require("../../assets/images/logo/logo_dark.png")}
                    alt="looginpage"
                  />
                </a>
              </div>
              <div className="login-main">
                <Form className="theme-form">
                  <h4>{"Create your account"}</h4>
                  <p>{"Enter your personal details to create account"}</p>
                  <FormGroup>
                    <Label className="col-form-label pt-0">{YourName}</Label>
                    <Row>
                      <Col xs="6">
                        <Input
                          className="form-control"
                          type="text"
                          required=""
                          placeholder="First name"
                          value={firstName}
                          onChange={(e) => setfirstName(e.target.value)}
                        />
                      </Col>
                      <Col xs="6">
                        <Input
                          className="form-control"
                          type="text"
                          required=""
                          placeholder="Last name"
                          value={lastName}
                          onChange={(e) => setlastName(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{EmailAddress}</Label>
                    <Input
                      className="form-control"
                      type="email"
                      required=""
                      placeholder="Test@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
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
                  </FormGroup>
                  <div className="login-btn mb-0">
                    <div className="checkbox ms-3">
                      <Input
                        id="checkbox1"
                        type="checkbox"
                        checked={policyAccepted}
                        onClick={() => {
                          setPolicyAccepted(!policyAccepted);
                        }}
                      />
                      <Label className="text-muted" for="checkbox1">
                        {"Agree with"}
                        <a className="ms-2" href="#javascript">
                          {PrivacyPolicy}
                        </a>
                      </Label>
                    </div>
                    <Button
                      color="primary"
                      type="submit"
                      onClick={handleCreateAccount}
                    >
                      {CreateAccount}
                    </Button>
                  </div>
                  <p className="mt-4 mb-0">
                    {"Already have an account?"}
                    <a
                      className="ms-2"
                      href="#javascript"
                      onClick={() => {
                        navigate(`${process.env.PUBLIC_URL}/login`);
                      }}
                    >
                      {SignIn}
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

export default Register;
