import React from "react";
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
import {
  EnterOTP,
  Resend,
  ResetPassword,
  SignIn,
} from "../../constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../customAxios";
import config from "../../config";
import { useSnackbar } from "notistack";

const ForgetpwdEnterOTP = (props) => {
  const [otp, setotp] = useState();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSend = async () => {
    let res = await customAxios.post(`${config.url}/auth/forgotPassword/checkOtp`, {
      otp: otp,
    });
    if (res.data.success) {
      navigate(`${process.env.PUBLIC_URL}/resetPassword`);
    } else {
      enqueueSnackbar(res.data.msg, { variant: "error" });
    }
  };

  const getNewOtp = async () => {
    let res = await customAxios(`${config.url}/auth/getotp`);
    if (res.data.success) {
      enqueueSnackbar("Another OTP Sent!", { variant: "success" });
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
                  <h4>{ResetPassword}</h4>
                  <div className="text-left mt-4 mb-4" onClick={getNewOtp}>
                    <span className="reset-password-link">
                      {"If don't receive OTP?"}  
                      <a className="btn-link font-danger" href="#javascript">
                        {Resend}
                      </a>
                    </span>
                  </div>
                  <FormGroup>
                    <Label className="col-form-label pt-0 ">{EnterOTP}</Label>
                    <Row>
                      <Col>
                        <Input
                          className="form-control text-center opt-text"
                          type="text"
                          placeholder="000000"
                          maxLength="6"
                          value={otp}
                          onChange={(e) => setotp(e.target.value)}
                        />
                      </Col>
                    </Row>
                  </FormGroup>
                  <FormGroup>
                    <Row>
                      {/* <Col className=""></Col> */}
                      <Col className="">
                        <Button onClick={handleSend} color="primary">
                          Send
                        </Button>
                      </Col>
                      {/* <Col className=""></Col> */}
                    </Row>
                  </FormGroup>

                  <p className="mt-4 mb-0">
                    {"Already have an password?"}
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

export default ForgetpwdEnterOTP;
