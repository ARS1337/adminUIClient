import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { routes } from './Routes';
import AppLayout from '../components/layout';
import {useSelector} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { useSnackbar } from 'notistack';

const LayoutRoutes = () => {
  const token = useSelector((state) =>{console.log('state',state);return state.Customizer.token});
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar();

  useEffect(()=>{
    if(!token){
      enqueueSnackbar("Please login!",{variant:"error"})
      navigate(`${process.env.PUBLIC_URL}/login`)
    }
  },[token])

  useEffect(()=>{
    if(!token){
      // enqueueSnackbar("Please login!",{variant:"error"})
      navigate(`${process.env.PUBLIC_URL}/login`)
    }
  },[])

  return (
    <>
      <Routes>
        {routes.map(({ path, Component }, i) => (
          <Route element={<AppLayout />} key={i}>
            <Route path={path} element={Component} />
          </Route>
        ))}
      </Routes>
    </>
  );
};

export default LayoutRoutes;