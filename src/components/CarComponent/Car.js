import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carsGet, carsPost, carsDelete } from '../../redux/actions/carAction';
import '../../Styles.css';

const Car = (props) => {

    // HOOKS
    const navigate = useNavigate();
    // const [name, setName] = useState('');
    // const [brand, setBrand] = useState('');
    // const [type, setType] = useState('');
    // const [registration, setRegistration] = useState('');
    // let [isRented, setIsRented] = useState('');

    // EVENTOS
    useEffect(() => {
        props.carsGet(props.cars);
    }, []);

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     isRented == true ? setIsRented(1) : setIsRented(0);
    //     props.carsPost(name, brand, type, registration, isRented);
    // }

    const handleClickAdd = () => {
        navigate("/AddCar");
    }

    const handleClickUpdate = (id, name, brand, type, registration, isRented) => {
        navigate("/UpdateCar", {
            state: {
                id, name, brand, type, registration, isRented
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
                        <td className="header">Modificar</td>
                        <td className="header">Eliminar</td>
                    </tr>
                </thead>
                <tbody>
                    {
                        props.cars ? props.cars.map(({ id, name, brand, type, registration, isRented }) => {
                            return <tr className="celda" key={registration}>
                                <td className="celda">{name}</td>
                                <td className="celda">{brand}</td>
                                <td className="celda">{type}</td>
                                <td className="celda">{registration}</td>
                                <td className="celda">{
                                    isRented===1 ? "Si" : "No"
                                }</td>
                                <td className="celda">
                                    <button className="btnUpdate" name={"btnUpdate"+id}
                                        onClick={() => handleClickUpdate(id, name, brand, type, registration, isRented)}>
                                        Modificar
                                    </button>
                                </td>
                                <td className="celda">
                                    <button className="btnDelete" onClick={() => props.carsDelete(id)}>
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
    carsGet,
    carsPost,
    carsDelete
}

export default connect(mapStateToProps, mapDispatchToProps)(Car);