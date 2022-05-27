import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { customersData, customerDeleted } from '../../redux/actions/customerAction';
import { carsData } from '../../redux/actions/carAction';
import '../../Styles.css';

const Customer = (props) => {

    // HOOKS
    const navigate = useNavigate();

    // EVENTOS
    useEffect(() => {
        props.customersData(props.customers);
        props.carsData(props.cars);
    }, []);

    const handleClickAdd = () => {
        navigate("/AddCustomer");
    }

    const handleClickUpdate = (id, name, surname, email, phone, dni, carRentedId) => {
        navigate("/UpdateCustomer", { 
            state: {
                id, name, surname, email, phone, dni, carRentedId
            }
        });
    }

    // BODY (TABLA)
    return (
        <div>
            <br />
            <button className="form" onClick={handleClickAdd}>Añadir Cliente</button>
            <br /><br />
            <table className="table">
                <thead>
                    <tr>
                        <td className="header">Nombre</td>
                        <td className="header">Apellido</td>
                        <td className="header">Correo Electrónico</td>
                        <td className="header">Teléfono</td>
                        <td className="header">Dni</td>
                        <td className="header">Coche Alquilado</td>
                        <td className="header">Modificar</td>
                        <td className="header">Eliminar</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.customers ? props.customers.map(({ id, name, surname, email, phone, dni, carRentedId }) => {
                            return <tr className="celda" key={dni}>
                                <td className="celda">{name}</td>
                                <td className="celda">{surname}</td>
                                <td className="celda">{email}</td>
                                <td className="celda">{phone}</td>
                                <td className="celda">{dni}</td>
                                <td className="celda">
                                {
                                    (props.cars && carRentedId != 0) ? props.cars.filter(car => carRentedId === car.id)
                                        .map(({ registration, model, id}) => {
                                        return <div key={id} value={id}>{registration} ({model})</div>
                                    })
                                    : 'No'
                                }
                                </td>
                                <td className="celda">
                                    <button className="btnUpdate" name={"btnUpdate"+id}
                                        onClick={() => handleClickUpdate(id, name, surname, email, phone, dni, carRentedId)}>
                                        Modificar
                                    </button>
                                </td>
                                <td className="celda">
                                    <button className="btnDelete"  onClick={() => props.customerDeleted(id)}>
                                        x
                                    </button>
                                </td>
                            </tr>
                        }) : null

                    }
                </tbody>
            </table>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        // Customers InitialState
        getCustomers: state.customerReducer.getCustomers,
        postCustomers: state.customerReducer.postCustomers,
        updateCustomers: state.customerReducer.updateCustomers,
        deleteCustomers: state.customerReducer.deleteCustomers,
        message: state.customerReducer.message,
        customers: state.customerReducer.customers,
        customer: state.customerReducer.customer,

        // Cars InitialState
        getCars: state.carReducer.getCars,
        postCars: state.carReducer.postCars,
        updateCars: state.carReducer.updateCars,
        deleteCars: state.carReducer.deleteCars,
        message: state.carReducer.message,
        cars: state.carReducer.cars
    }
}

const mapDispatchToProps = {
    // Customers Actions
    customersData,
    customerDeleted,

    // Cars Actions
    carsData
}

export default connect(mapStateToProps, mapDispatchToProps)(Customer);