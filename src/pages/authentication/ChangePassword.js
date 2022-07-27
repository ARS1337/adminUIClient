import React, { Fragment, useEffect, useState } from "react";
import Breadcrumb from "../../layout/breadcrumb";
import { useNavigate } from "react-router-dom";
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
  Password,
  Website,
  Save,
  EmailAddress,
  NewPassword,
} from "../../constant";
import { classes } from "../../data/layouts";
import customAxios from "../../customAxios";
import config from "../../config";
import { useSnackbar } from "notistack";

const ChangePassword = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  const handleSave = async (e) => {
    e.preventDefault();
    let res = await customAxios.post(`${config.url}/auth/changePassword`, {
      email: email,
      password: password,
      newPassword: newPassword,
    });
    if (res.data.success) {
      enqueueSnackbar(res.data.msg, { variant: "success" });
      enqueueSnackbar("Redirecting... please login with your new password", { variant: "success" });
      setTimeout(() => {
        navigate(`${process.env.PUBLIC_URL}/login`);
      }, 500);
    } else {
      enqueueSnackbar(res.data.msg, { variant: "error" });
    }
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
                  <FormGroup>
                    <Label className="form-label">{EmailAddress}</Label>
                    <Input
                      className="form-control"
                      placeholder="your-email@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="form-label">{Password}</Label>
                    <Input
                      className="form-control"
                      type="password"
                      placeholder="**********"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label className="form-label">{NewPassword}</Label>
                    <Input
                      className="form-control"
                      type="password"
                      placeholder="**********"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </FormGroup>
                  <div className="form-footer">
                    <button className="btn btn-primary" onClick={handleSave}>
                      {Save}
                    </button>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default ChangePassword;
