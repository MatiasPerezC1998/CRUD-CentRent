import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { customerAdded } from '../../redux/actions/customerAction';
import { carsData } from '../../redux/actions/carAction';
import '../../Styles.css';

const AddCustomer = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [dni, setDni] = useState('');
    const [carRentedId, setCarRentedId] = useState('');

    // EVENTS
    useEffect( () => {
        props.carsData(props.cars);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        props.customerAdded(name, surname, email, phone, dni, carRentedId);
        navigate("/Customer");
    }

    // BODY
    return (
        <div>
            <br />
            <form className="form" onSubmit={handleSubmit}>
                <table className="table">
                    <tbody>
                        <tr>
                            <td className="header">Nombre</td>
                            <td className="celda">
                                <input type="text" name={"name"} value={name}
                                    onChange={e => setName(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Apellido</td>
                            <td className="celda">
                                <input type="text" name={"surname"} value={surname}
                                    onChange={e => setSurname(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Correo Electrónico</td>
                            <td className="celda">
                                <input type="text" name={"email"} value={email}
                                    onChange={e => setEmail(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Teléfono</td>
                            <td className="celda">
                                <input type="text" name={"phone"} value={phone}
                                    onChange={e => setPhone(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Dni</td>
                            <td className="celda">
                                <input type="text" name={"dni"} value={dni}
                                    onChange={e => setDni(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Coche Alquilado</td>
                            <td className="celda">
                                <select onChange={e => setCarRentedId(e.target.value)}>
                                    <option key={0}></option>
                                    {
                                        props.cars ? props.cars.filter(name => !name.isRented).map(({ registration, model, id}) => {
                                            return <option key={id} value={id}>
                                                {registration} ({model})
                                            </option>
                                        }): null
                                    }
                                    
                                </select>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br />
                <button type="submit">Añadir Cliente</button>

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
        customerMessage: state.customerReducer.message,
        customers: state.customerReducer.customers,

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
    // Customers Actions
    customerAdded,

    // Cars Actions
    carsData,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);