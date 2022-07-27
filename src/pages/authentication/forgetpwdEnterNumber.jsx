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
import { EnterMobileNumber, ResetPassword, SignIn, Send } from "../../constant";
import { useNavigate } from "react-router-dom";
import customAxios from "../../customAxios";
import config from "../../config";
import { useSnackbar } from "notistack";
import axios from "axios";

const ForgetpwdEnterNumber = (props) => {
  const [telno, setTelno] = useState();
  const [prefix, setPrefix] = useState("+91");
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmitNumber = async (e) => {
    e.preventDefault()
    let res = await customAxios.post(`${config.url}/auth/forgotPassword/saveNumber`, {
      telno: telno,
      prefix: prefix,
    });
    if (res.data.success) {
      navigate(`${process.env.PUBLIC_URL}/forgotPasswordEnterOtp`);
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
                  <FormGroup>
                    <Label className="col-form-label">
                      {EnterMobileNumber}
                    </Label>
                    <Row>
                      <Col md="3">
                        <Input
                          className="form-control mb-1"
                          type="text"
                          placeholder="+ 91"
                          value={prefix}
                          onChange={(e) => setPrefix(e.target.value)}
                        />
                      </Col>
                      <Col md="9">
                        <Input
                          className="form-control mb-1"
                          type="tel"
                          value={telno}
                          onChange={(e) => setTelno(e.target.value)}
                          placeholder="000-000-0000"
                        />
                      </Col>
                      <Col xs="12">
                        <Button
                          color="primary"
                          className="m-t-10"
                          type="submit"
                          onClick={handleSubmitNumber}
                        >
                          {Send}
                        </Button>
                      </Col>
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

export default ForgetpwdEnterNumber;
