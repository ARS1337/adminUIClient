import { useSnackbar } from "notistack";
import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  FormGroup,
  Label,
  Input,
  Button,
} from "reactstrap";
import config from "../../config";
import {
  NewPassword,
  RetypePassword,
  Done,
  RememberPassword,
  CreateAccount,
} from "../../constant";
import customAxios from "../../customAxios";

const Resetpwd = (props) => {
  const [togglePassword, setTogglePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const HideShowPassword = (tPassword) => {
    setTogglePassword(!tPassword);
  };

  const handleReset = async (e) => {
    e.preventDefault();
    let res = await customAxios.post(
      `${config.url}/auth/forgotPassword/resetPassword`,
      {
        password: password,
        confirmPassword: confirmPassword,
      }
    );
    if (res.data.success) {
      enqueueSnackbar("Password Reset Successfull!", { variant: "success" });
      enqueueSnackbar("Redirecting to Login page", { variant: "info" });
      setTimeout(()=>{
        window.location.href=`${process.env.PUBLIC_URL}/login`
      },500)
    }else{
      enqueueSnackbar(res.data.msg,{variant:'error'})
    }
  };

  return (
    <Container fluid={true}>
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
                  <h4>{"Create Your Password"}</h4>
                  <FormGroup>
                    <Label className="col-form-label">{NewPassword}</Label>
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
                  </FormGroup>
                  <FormGroup>
                    <Label className="col-form-label">{RetypePassword}</Label>
                    <Input
                      className="form-control"
                      type="password"
                      name="login[password]"
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      required=""
                      placeholder="*********"
                    />
                  </FormGroup>
                  <FormGroup className="mb-0">
                    <div className="checkbox ms-3">
                      <Input id="checkbox1" type="checkbox" />
                      <Label className="text-muted" for="checkbox1">
                        {RememberPassword}
                      </Label>
                    </div>
                    <Button color="primary" type="submit" onClick={handleReset}>
                      {Done}
                    </Button>
                  </FormGroup>
                  <p className="mt-4 mb-0">
                    {"Don't have account?"}
                    <a className="ms-2" href="#javascript">
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

export default Resetpwd;
