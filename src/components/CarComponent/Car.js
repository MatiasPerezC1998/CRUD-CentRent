import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carsData, carDeleted } from '../../redux/actions/carAction';
import '../../Styles.css';

const Car = (props) => {

    // HOOKS
    const navigate = useNavigate();

    // EVENTOS
    useEffect( () => {
         props.carsData(props.cars);
    }, []);

    const handleClickAdd = () => {
        navigate("/AddCar");
    }

    const handleClickUpdate = (id, model, brand, type, registration, isRented, image) => {
        navigate("/UpdateCar", {
            state: {
                id, model, brand, type, registration, isRented, image
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
                        props.cars ? props.cars.map(({ id, model, brand, type, registration, isRented, image }) => {
                            return <tr className="celda" key={registration}>
                                <td className="celda">{brand}</td>
                                <td className="celda">{model}</td>
                                <td className="celda">{type}</td>
                                <td className="celda">{registration}</td>
                                <td className="celda">
                                    {
                                        (isRented===1) ? "Si" : "No"
                                    }
                                </td>
                                <td className="celda">
                {/* {console.log(image)} */}

                                    {
                                        (image === null) ?
                                            'Sin imagen' : <img className="carImage" alt={image} src={"https://localhost:7295/Car/GetImage?imageUrl=" + image}/>
                                    }
                                </td>
                                <td className="celda">
                                    <button className="btnUpdate" name={"btnUpdate"+id}
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
        getImage: state.carReducer.getImage,
        postImage: state.carReducer.postImage,
        carMessage: state.carReducer.carMessage,
        imageMessage: state.carReducer.imageMessage,
        cars: state.carReducer.cars,
        image: state.carReducer.image,
    }
}

const mapDispatchToProps = {
    // Cars Actions
    carsData,
    carDeleted,
}

export default connect(mapStateToProps, mapDispatchToProps)(Car);