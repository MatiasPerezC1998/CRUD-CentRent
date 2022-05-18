import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { customersUpdate } from '../../redux/actions/customerAction';
import { carsGet } from '../../redux/actions/carAction';
import '../../Styles.css';

const UpdateCustomer = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id, name, surname, email, phone, dni, carRentedId } = state;
    const [updateName, setName] = useState(name);
    const [updateSurame, setSurname] = useState(surname);
    const [updateEmail, setEmail] = useState(email);
    const [updatePhone, setPhone] = useState(phone);
    const [updateDni, setDni] = useState(dni);
    const [updateCarRentedId, setCarRentedId] = useState(carRentedId);

    // EVENTS
    const handleSubmit = async(e) => {
        e.preventDefault();
        props.customersUpdate(id, updateName, updateSurame, updateEmail, updatePhone, updateDni, updateCarRentedId);
        navigate("/Customer");
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
                            <td className="header">Apellido</td>
                            <td className="celda">
                                <input type="text" name={"surname"} value={updateSurame}
                                    onChange={e => setSurname(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Correo Electrónico</td>
                            <td className="celda">
                                <input type="text" name={"email"} value={updateEmail}
                                    onChange={e => setEmail(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Teléfono</td>
                            <td className="celda">
                                <input type="number" name={"phone"} value={updatePhone}
                                    onChange={e => setPhone(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Dni</td>
                            <td className="celda">
                                <input type="text" name={"dni"} value={updateDni}
                                    onChange={e => setDni(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Coche Alquilado</td>
                            <td className="celda">
                                <select onChange={e => setCarRentedId(e.target.value)} defaultValue={updateCarRentedId}>
                                <option key={0}></option>
                                    {
                                        props.cars ? props.cars.filter(car => car.id === updateCarRentedId || !car.isRented).map(({ name, registration, id }) => {
                                            return <option key={id} value={id}>
                                                {registration} ({name})
                                            </option>
                                        }): null
                                    }
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br/>
                <button type="submit">Modificar Cliente</button>

            </form>
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
    customersUpdate,

    // Cars Actions
    carsGet
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCustomer);