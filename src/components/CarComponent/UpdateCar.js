import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { carsUpdate } from '../../redux/actions/carAction'
import '../../Styles.css';

const UpdateCar = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id, name, brand, type, registration, isRented } = state;
    const [updateName, setName] = useState(name);
    const [updateBrand, setBrand] = useState(brand);
    const [updateType, setType] = useState(type);
    const [updateRegistration, setRegistration] = useState(registration);
    const [updateIsRented, setIsRented] = useState(isRented);

    // EVENTS
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsRented(0);
        props.carsUpdate(id, updateName, updateBrand, updateType, updateRegistration, updateIsRented);
        navigate("/Car");
    }

    // BODY
    return (
        <div>
            <br/>
            <form className="form" onSubmit={handleSubmit}>
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="header">Nombre</td>
                            <td className="celda">
                                <input type="text" name={"name"} value={updateName}
                                    onChange={e => setName(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Marca</td>
                            <td className="celda">
                                <input type="text" name={"brand"} value={updateBrand}
                                    onChange={e => setBrand(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Tipo</td>
                            <td className="celda">
                                <input type="text" name={"type"} value={updateType}
                                    onChange={e => setType(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Matrícula</td>
                            <td className="celda">
                                <input type="text" name={"registration"} value={updateRegistration}
                                    onChange={e => setRegistration(e.target.value)}/>
                            </td>
                        </tr>
                        {/* <tr>
                            <td className="header">Alquilado</td>
                            <td className="celda">
                                <input type="checkbox" name={"isRented"} value={isRented}
                                    onChange={e => (e.target.checked) ? setIsRented(1) : setIsRented(0)}/>
                            </td>
                        </tr> */}
                    </tbody>
                </table>

                <br/>
                <button type="submit">Modificar Coche</button>

            </form>
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
    carsUpdate
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCar);