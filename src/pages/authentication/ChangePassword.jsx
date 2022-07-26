import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, FormGroup, Label, Input } from "reactstrap";
import { Save, NewPassword, CurrentPassword } from "../../constant";
import { classes } from "../../data/layouts";
import customAxios from "../../customAxios";
import config from "../../config";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { validator } from "../../validationSchemas/validator";
import { changePasswordSchema } from "../../validationSchemas/authSchemas";

const ChangePassword = (props) => {
  const email = useSelector((state) => state.Customizer.email);
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [togglePasswordCurrent, setTogglePasswordCurrent] = useState("");
  const [togglePasswordConfirm, setTogglePasswordConfirm] = useState("");
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  const validateForm = async (e, schema, cb) => {
    e.preventDefault()
    let objectToValidate = {
      email: email,
      password: password,
      newPassword: newPassword,
    };
    let validationResult = await validator(schema, objectToValidate);
    console.log(validationResult);
    if (validationResult.success) {
      cb(e);
    } else {
      enqueueSnackbar(validationResult.msg, { variant: "error" });
    }
  };

  const handleSave = async (e) => {
    try {
      e.preventDefault();
      let res = await customAxios.post(
        `${config.url}/protectedRoute/changePassword`,
        {
          email: email,
          password: password,
          newPassword: newPassword,
        }
      );
      if (res.data.success) {
        enqueueSnackbar(res.data.msg, { variant: "success" });
        enqueueSnackbar("Redirecting... ", {
          variant: "success",
        });
        setTimeout(() => {
          navigate(`${process.env.PUBLIC_URL}/dashboard/default/${layout}`);
        }, 500);
      } else {
        enqueueSnackbar(res.data.msg, { variant: "error" });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container fluid={true} className="p-0">
      <Row className="m-0">
        <Col xs="12" className="p-0">
          <div className="login-card change-password align-items-center h-75">
            <div>
              <div className="login-main login-tab mt-0">
                <Form className="theme-form">
                  <div className="mb-3 position-relative">
                    <Label className="col-form-label">{CurrentPassword}</Label>
                    <Input
                      className="form-control"
                      type={togglePasswordCurrent ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required=""
                      placeholder="*********"
                    />
                    <div
                      className="show-hide"
                      onClick={() =>
                        setTogglePasswordCurrent(!togglePasswordCurrent)
                      }
                    >
                      <span
                        className={togglePasswordCurrent ? "" : "show"}
                      ></span>
                    </div>
                  </div>

                  <div className="mb-3 position-relative">
                    <Label className="col-form-label">{NewPassword}</Label>
                    <Input
                      className="form-control"
                      type={togglePasswordConfirm ? "text" : "password"}
                      name="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required=""
                      placeholder="*********"
                    />
                    <div
                      className="show-hide"
                      onClick={() =>
                        setTogglePasswordConfirm(!togglePasswordConfirm)
                      }
                    >
                      <span
                        className={togglePasswordConfirm ? "" : "show"}
                      ></span>
                    </div>
                  </div>
                  <div className="form-footer">
                    <button
                      className="btn btn-primary"
                      onClick={(e) => {
                        validateForm(e, changePasswordSchema, handleSave);
                      }}
                    >
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
