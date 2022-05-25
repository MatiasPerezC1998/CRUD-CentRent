import { toHaveDescription } from '@testing-library/jest-dom/dist/matchers';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carsData, carDeleted } from '../../redux/actions/carAction';
import '../../Styles.css';

const Car = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const [cars, setCars] = useState([]);

    // EVENTOS
    useEffect(() => {
        props.carsData(props.cars);
        setCars(props.cars);
    }, []);

    const handleClickAdd = () => {
        navigate("/AddCar");
    }

    const handleClickUpdate = (id, brand, model, type, registration, isRented, image) => {
        navigate("/UpdateCar", {
            state: {
                id, model, brand, type, registration, isRented, image
            }
        });
    }

    const filterCars = (type, isRented) => {
        var carsFiltered = props.cars.filter(x => x.type == type && x.isRented == isRented);
        if (carsFiltered.length > 0) {
            setCars(carsFiltered);
        }
    }

    // BODY (TABLA)
    return (
        <div>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <td className="header">Marca</td>
                        <td className="header">Modelo</td>
                        <td className="header">Tipo</td>
                        <td className="header">Matrícula</td>
                        <td className="header">Alquilado</td>
                        <td className="header">Imagen</td>
                        <td className="header">Modificar</td>
                        <td className="header">Eliminar</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        cars ? cars.map(({ id, model, brand, type, registration, isRented, image }) => {
                            console.log(cars);
                            return <tr className="celda" key={registration}>
                                <td className="celda">{brand}</td>
                                <td className="celda">{model}</td>
                                <td className="celda">{type}</td>
                                <td className="celda">{registration}</td>
                                <td className="celda">
                                    {
                                        (isRented === 1) ? "Si" : "No"
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
                                        onClick={() => handleClickUpdate(id, model, brand, type, registration, isRented, image)}>
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
            <br /><br />
            <button className="form" onClick={handleClickAdd}>Añadir Coche</button>
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
    }
}

const mapDispatchToProps = {
    // Cars Actions
    carsData,
    carDeleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Car);