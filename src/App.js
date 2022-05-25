import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { connect } from "react-redux";

import Login from "./components/Login";
import Register from "./components/Register";
import PrivateRoutes from "./components/PrivateRoutes";
import Navbar from "./components/Navbar";
import Page from "./components/Page";
import Car from "./components/CarComponent/Car";
import AddCar from "./components/CarComponent/AddCar";
import UpdateCar from "./components/CarComponent/UpdateCar";
import Customer from "./components/CustomerComponent/Customer";
import AddCustomer from "./components/CustomerComponent/AddCustomer";
import UpdateCustomer from "./components/CustomerComponent/UpdateCustomer";
import CarType from "./components/CarTypeComponent/CarType";
import AddCarType from "./components/CarTypeComponent/AddCarType";
import UpdateCarType from "./components/CarTypeComponent/UpdateCarType";
import Profile from "./components/Profile";
import Search from "./components/Search";

function App ({token}) {

  return (
    <div>
      <div>
        
        <BrowserRouter>

          <Routes>

            <Route path="/" element={<Login/>} />
            <Route path="/Login" element={<Login/>} />
            <Route path="/Register" element={<Register/>} />

            <Route exact element={<PrivateRoutes/>} >

              <Route element={ <>
                  <Navbar/>
                  <Outlet/>
              </> }>
                <Route path="/Page" element={<Page/>} />
                <Route path="/Car" element={<Car/>} />
                <Route path="/AddCar" element={<AddCar/>} />
                <Route path="/UpdateCar" element={<UpdateCar/>} />
                <Route path="/Customer" element={<Customer/>} />
                <Route path="/AddCustomer" element={<AddCustomer/>} />
                <Route path="/UpdateCustomer" element={<UpdateCustomer/>} />
                <Route path="/CarType" element={<CarType/>} />
                <Route path="/AddCarType" element={<AddCarType/>} />
                <Route path="/UpdateCarType" element={<UpdateCarType/>} />
                <Route path="/Profile" element={<Profile/>} />
                <Route path="/Search" element={<Search/>} />
              </Route>

            </Route>

          </Routes>

        </BrowserRouter>

      </div>
    </div>

  );
}

const mapStateToProps = (state) => {
  return {
    token: state.loginReducer.token,
  }
}

export default connect(mapStateToProps)(App);
