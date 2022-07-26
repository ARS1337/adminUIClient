import React from "react";
import { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Loader from "../layout/loader";
import LayoutRoutes from "./LayoutRoutes";
import { classes } from "../data/layouts";
import Signin from "../pages/authentication/login";
import Resetpwd from "../pages/authentication/resetpwd";
import Register from "../pages/authentication/register";
import Forgetpwd from "../pages/authentication/forgetpwd";
import ForgetpwdEnterNumber from "../pages/authentication/forgetpwdEnterNumber";
import ForgetpwdEnterOTP from "../pages/authentication/forgetpwdEnterOTP";
import ChangePassword from "../pages/authentication/ChangePassword";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";

const Routers = () => {
  const { enqueueSnackbar } = useSnackbar();
  const token = useSelector((state) => {
    console.log("state", state);
    return state.Customizer.token;
  });
  const abortController = new AbortController();
  const defaultLayoutObj = classes.find(
    (item) => Object.values(item).pop(1) === "compact-wrapper"
  );
  const layout =
    localStorage.getItem("layout") || Object.keys(defaultLayoutObj).pop();

  useEffect(() => {
    const handleInvalidToken = () => {
      if (
        !localStorage.getItem("token") &&
        window.location.href.split("/").pop() != "login"
      ) {
        enqueueSnackbar("Please login first!", { variant: "error" });
        window.location.href = `${process.env.PUBLIC_URL}/login`;
      }
    };

    window.addEventListener("storage", handleInvalidToken);

    return () => {
      window.removeEventListener("storage", handleInvalidToken);
    };
  }, []);

  useEffect(() => {
    console.ignoredYellowBox = ["Warning: Each", "Warning: Failed"];
    console.disableYellowBox = true;
    return function cleanup() {
      abortController.abort();
    };
  }, [abortController]);

  return (
    <BrowserRouter basename={"/"}>
      <>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/login`}
              element={<Signin />}
            />
            <Route
              exact
              path={`/`}
              element={<Signin />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/forgotPasswordEnterNumber`}
              element={<ForgetpwdEnterNumber />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/forgotPasswordEnterOtp`}
              element={<ForgetpwdEnterOTP />}
            />
            <Route
              exact
              path={`${process.env.PUBLIC_URL}/resetPassword`}
              element={<Resetpwd />}
            />

            <Route
              exact
              path={`${process.env.PUBLIC_URL}/Register`}
              element={<Register />}
            />
            {
              <Route
                exact
                path={`${process.env.PUBLIC_URL}`}
                element={
                  <Navigate
                    to={`${process.env.PUBLIC_URL}/dashboard/default/${layout}`}
                  />
                }
              />
            }
            {<Route path={`/*`} element={<LayoutRoutes />} />}
          </Routes>
        </Suspense>
      </>
    </BrowserRouter>
  );
};

export default Routers;
