import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carsData, carDeleted } from '../../redux/actions/carAction';
import '../../Styles.css';

const Car = (props) => {

    // HOOKS
    const navigate = useNavigate();

    // EVENTOS
    useEffect(() => {
        props.carsData(props.cars);
    }, []);

    const handleClickAdd = () => {
        navigate("/AddCar");
    }

    const handleClickUpdate = (id, name, brand, type, registration, isRented, image) => {
        navigate("/UpdateCar", {
            state: {
                id, name, brand, type, registration, isRented, image
            }
        });
    }

    // BODY (TABLA)
    return (
        <div>
            <br />
            <table className="table">
                <thead>
                    <tr>
                        <td className="header">Nombre</td>
                        <td className="header">Marca</td>
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
                        props.cars ? props.cars.map(({ id, name, brand, type, registration, isRented, image }) => {
                            return <tr className="celda" key={registration}>
                                <td className="celda">{name}</td>
                                <td className="celda">{brand}</td>
                                <td className="celda">{type}</td>
                                <td className="celda">{registration}</td>
                                <td className="celda">
                                    {
                                        (isRented===1) ? "Si" : "No"
                                    }
                                </td>
                                <td className="celda">
                                    {
                                        (image === null) ?
                                            'Sin imagen' : <img className="carImage" src={image}/>
                                    }
                                </td>
                                <td className="celda">
                                    <button className="btnUpdate" name={"btnUpdate"+id}
                                        onClick={() => handleClickUpdate(id, name, brand, type, registration, isRented, image)}>
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
        message: state.carReducer.message,
        cars: state.carReducer.cars
    }
}

const mapDispatchToProps = {
    // Users Actions
    carsData,
    carDeleted
}

export default connect(mapStateToProps, mapDispatchToProps)(Car);