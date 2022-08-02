import React, { useEffect } from "react";
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
  OtpDiable,
  OtpDisable,
  Resend,
  ResetPassword,
  SignIn,
} from "../../constant";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import customAxios from "../../customAxios";
import config from "../../config";
import { useSnackbar } from "notistack";
import { checkOtpSchema } from "../../validationSchemas/authSchemas";
import { validator } from "../../validationSchemas/validator";
import { debounce } from "lodash";

const ForgetpwdEnterOTP = (props) => {
  const [otp, setotp] = useState();
  const [disableOtpButton, setDisableotpButton] = useState(false);
  const [timer, setTimer] = useState(0);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const validateForm = async (e, schema, cb) => {
    e.preventDefault();
    let objectToValidate = {
      otp: otp,
    };
    let validationResult = await validator(schema, objectToValidate);
    console.log(validationResult);
    if (validationResult.success) {
      cb(e);
    } else {
      enqueueSnackbar(validationResult.msg, { variant: "error" });
    }
  };

  useEffect(() => {
    let timerId
    if (disableOtpButton) {
      setTimer(30);
      timerId = setInterval(() => {
        setTimer((timer) => timer - 1);
      }, 1000);
      setDisableotpButton(true);
      debounce(getNewOtp, 500, { leading: true })();
      setTimeout(() => {
        setDisableotpButton(false);
        clearInterval(timerId);
        setTimer(30);
      }, 30 * 1000);
    }
    return ()=>{clearInterval(timerId)}
  }, [disableOtpButton]);

  const handleResend = () => {setDisableotpButton(true)};

  const handleSend = async (e) => {
    e.preventDefault();
    let res = await customAxios.post(
      `${config.url}/auth/forgotPassword/checkOtp`,
      {
        otp: otp,
      }
    );
    if (res.data.success) {
      navigate(`${process.env.PUBLIC_URL}/resetPassword`);
    } else {
      enqueueSnackbar(res.data.msg, { variant: "error" });
    }
  };

  const getNewOtp = async () => {
    let res = await customAxios.post(
      `${config.url}/auth/forgotPassword/getNewOtp`
    );
    if (res.data.success) {
      enqueueSnackbar(res.data.msg, { variant: "success" });
    } else {
      enqueueSnackbar(res.data.msg, { variant: "error" });
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
                  {disableOtpButton ? (
                    <div className="text-left mt-4 mb-4">
                      {OtpDisable + timer + " sec"}
                    </div>
                  ) : (
                    <div className="text-left mt-4 mb-4" onClick={handleResend}>
                      <span className="reset-password-link">
                        {"If don't receive OTP?"}  
                        <a className="btn-link font-danger" href="#javascript">
                          {Resend}
                        </a>
                      </span>
                    </div>
                  )}
                  <FormGroup>
                    <Label className="col-form-label pt-0 ">{EnterOTP}</Label>
                    <Row>
                      <Col>
                        <Input
                          className="form-control text-center opt-text"
                          type="number"
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
                        <Button
                          onClick={(e) => {
                            validateForm(e, checkOtpSchema, handleSend);
                          }}
                          color="primary"
                        >
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
