import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carsData, carDeleted } from '../../redux/actions/carAction';
import { availableCarsData } from '../../redux/actions/carTypeAction';
import '../../Styles.css';

const Car = (props) => {

    // HOOKS
    const navigate = useNavigate();

    // EVENTOS
    useEffect(() => {
        props.carsData(props.cars);
        props.availableCarsData(props.availableCars);
    }, []);

    const handleClickAdd = () => {
        navigate("/AddCar");
    }

    const handleClickUpdate = (id, brand, model, type, registration, isRented, image, carTypeId) => {
        navigate("/UpdateCar", {
            state: {
                id, model, brand, type, registration, isRented, image, carTypeId
            }
        });
    }

    const handleClickNavigate = () => {
        navigate("/AvailableCarsForm");
    }

    // BODY (TABLA)
    return (
        <div>
            <br/>
            <button className="form" onClick={handleClickNavigate}>Mostrar coches disponibles</button>
            <br /><br />
            <button className="form" onClick={handleClickAdd}>Añadir Coche</button>
            <br /><br />
            <table className="table">
                <thead>
                    <tr>
                        <td className="header">Marca</td>
                        <td className="header">Modelo</td>
                        <td className="header">Tipo</td>
                        <td className="header">Matrícula</td>
                        <td className="header">Disponible</td>
                        <td className="header">Imagen</td>
                        <td className="header">Modificar</td>
                        <td className="header">Eliminar</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.cars ? props.cars.map(({ id, model, brand, type, registration, isRented, image, carTypeId }) => {
                            return <tr className="celda" key={registration}>
                                <td className="celda">{brand}</td>
                                <td className="celda">{model}</td>
                                <td className="celda">{type}</td>
                                <td className="celda">{registration}</td>
                                <td className="celda">
                                    {
                                        (isRented === 0) ? "✔️" : "❌"
                                    }
                                </td>
                                <td className="celda">
                                    {
                                        (image === null) ?
                                            'Sin imagen' : <img className="carImage" alt={image} src={"https://localhost:7295/Car/GetImage?imageUrl=" + image} />
                                    }
                                </td>
                                <td className="celda">
                                    <button className="btnUpdate" name={"btnUpdate" + id}
                                        onClick={() => handleClickUpdate(id, model, brand, type, registration, isRented, image, carTypeId)}>
                                        Modificar
                                    </button>
                                </td>
                                <td className="celda">
                                    <button className="btnDelete" onClick={() => props.carDeleted(id)}>
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
        // Cars InitialState
        getCars: state.carReducer.getCars,
        postCars: state.carReducer.postCars,
        updateCars: state.carReducer.updateCars,
        deleteCars: state.carReducer.deleteCars,
        carMessage: state.carReducer.carMessage,
        cars: state.carReducer.cars,

        // CarTypes InitialState
        getCarTypes: state.carTypeReducer.getCarTypes,
        postCarTypes: state.carTypeReducer.postCarTypes,
        updateCarTypes: state.carTypeReducer.updateCarTypes,
        deleteCarTypes: state.carTypeReducer.deleteCarTypes,
        carTypesMessage: state.carTypeReducer.carTypesMessage,
        carTypes: state.carTypeReducer.carTypes,
        carType: state.carTypeReducer.carType,
        getAvailableCars: state.carTypeReducer.getAvailableCars,
        availableCarsMessage: state.carTypeReducer.availableCarsMessage,
        availableCars: state.carTypeReducer.availableCars
    }
}

const mapDispatchToProps = {
    // Cars Actions
    carsData,
    carDeleted,

    // CarTypes Actions
    availableCarsData,
}

export default connect(mapStateToProps, mapDispatchToProps)(Car);