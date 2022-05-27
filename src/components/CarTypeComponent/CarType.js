import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carTypeData, carTypeDeleted, availableCarsData } from '../../redux/actions/carTypeAction';
import { carsData } from '../../redux/actions/carAction';
import '../../Styles.css';

const CarType = (props) => {

    // HOOKS
    const navigate = useNavigate();

    // EVENTOS
    useEffect( () => {
        props.carTypeData(props.carTypes);
        props.carsData(props.cars);
        props.availableCarsData(props.availableCars);
    }, []);

    const handleClickAdd = () => {
        navigate("/AddCarType");
    }

    const handleClickUpdate = (id, brand, model, type, image) => {
        navigate("/UpdateCarType", {
            state: {
                id, brand, model, type, image
            }
        });
    }

    // BODY (TABLA)
    return (
        <div>
            <br />
            <button className="form" onClick={handleClickAdd}>Añadir Tipo de Coche</button>
            <br /><br />
            <table className="table">
                <thead>
                    <tr>
                        <td className="header">Marca</td>
                        <td className="header">Modelo</td>
                        <td className="header">Tipo</td>
                        <td className="header">Modelos disponibles/totales</td>
                        <td className="header">Imagen</td>
                        <td className="header">Modificar</td>
                        <td className="header">Eliminar</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.carTypes ? props.carTypes.map(({ id, brand, model, type, carCount, image }) => {
                            return <tr className="celda" key={model}>
                                <td className="celda">{brand}</td>
                                <td className="celda">{model}</td>
                                <td className="celda">{type}</td>
                                <td className="celda">{props.availableCars.filter(x=>x.carTypeId === id).length}/{carCount}</td>
                                <td className="celda">
                                    {
                                        (image === null) ?
                                            'Sin imagen' : <img className="carImage" alt={image} src={"https://localhost:7295/Car/GetImage?imageUrl=" + image + "&Authorization=Bearer " + localStorage.getItem("token")}/>
                                    }
                                </td>
                                <td className="celda">
                                    <button className="btnUpdate" name={"btnUpdate"+id}
                                        onClick={() => handleClickUpdate(id, brand, model, type, image)}>
                                        Modificar
                                    </button>
                                </td>
                                <td className="celda">
                                    <button className="btnDelete" onClick={() => props.carTypeDeleted(id)}>
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
        // CarTypes InitialState
        getCarTypes: state.carTypeReducer.getCarTypes,
        postCarTypes: state.carTypeReducer.postCarTypes,
        updateCarTypes: state.carTypeReducer.updateCarTypes,
        deleteCarTypes: state.carTypeReducer.deleteCarTypes,
        carTypeMessage: state.carTypeReducer.message,
        carTypes: state.carTypeReducer.carTypes,
        carType: state.carTypeReducer.carType,
        getAvailableCars: state.carTypeReducer.getAvailableCars,
        availableCarsMessage: state.carTypeReducer.availableCarsMessage,
        availableCars: state.carTypeReducer.availableCars,

        // Cars InitialState
        getCars: state.carReducer.getCars,
        postCars: state.carReducer.postCars,
        updateCars: state.carReducer.updateCars,
        deleteCars: state.carReducer.deleteCars,
        carMessage: state.carReducer.message,
        cars: state.carReducer.cars
    }
}

const mapDispatchToProps = {
    // CarTypes Actions
    carTypeData,
    carTypeDeleted,
    availableCarsData,

    // Cars Actions
    carsData,
}

export default connect(mapStateToProps, mapDispatchToProps)(CarType);