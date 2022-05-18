import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carAdded } from '../../redux/actions/carAction';
import '../../Styles.css';

const AddCar = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [registration, setRegistration] = useState('');
    const [isRented, setIsRented] = useState('');
    const [image, setImage] = useState('');

    // EVENTS
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsRented(0);
        props.carAdded(name, brand, type, registration, isRented, image);
        navigate("/Car");
    }

    console.log(image);

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
                            <td className="header">Marca</td>
                            <td className="celda">
                                <input type="text" name={"brand"} value={brand}
                                    onChange={e => setBrand(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Tipo</td>
                            <td className="celda">
                                <input type="text" name={"type"} value={type}
                                    onChange={e => setType(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Matrícula</td>
                            <td className="celda">
                                <input type="text" name={"registration"} value={registration}
                                    onChange={e => setRegistration(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Imagen</td>
                            <td className="celda">
                                <input type="text" name={"image"} value={image}
                                    onChange={e => setImage(e.target.value)} />
                            </td>
                        </tr>
                    </tbody>
                </table>

                <br />
                <button type="submit">Añadir Coche</button>
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
    carAdded

}

export default connect(mapStateToProps, mapDispatchToProps)(AddCar);