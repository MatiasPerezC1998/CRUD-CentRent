import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carAdded } from '../../redux/actions/carAction';
import { carTypeData } from '../../redux/actions/carTypeAction';
import '../../Styles.css';

const AddCar = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const [registration, setRegistration] = useState('');
    const [carTypeId, setCarTypeId] = useState('');

    // EVENTS
    useEffect( () => {
        props.carTypeData(props.carTypes);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        await props.carAdded(registration, carTypeId);
        navigate("/Car");
    }

    // BODY
    return (
        <div>
            <br />
            <form className="form" onSubmit={handleSubmit}>
                <table className="table">
                    <tbody>                     
                        <tr>
                            <td className="header">Matrícula</td>
                            <td className="celda">
                                <input type="text" name={"registration"} value={registration}
                                    onChange={e => setRegistration(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Tipo</td>
                            <td className="celda">
                                <select onChange={e => setCarTypeId(e.target.value)}>
                                    <option key={0}></option>
                                    {
                                        props.carTypes ? props.carTypes.map(({id, model, brand}) => {
                                            return <option key={id} value={id}>
                                                {model} ({brand})
                                            </option>
                                        }): null
                                    }
                                    
                                </select>
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
        carMessage: state.carReducer.message,
        cars: state.carReducer.cars,

        // CarTypes InitialState
        getCarTypes: state.carTypeReducer.getCarTypes,
        postCarTypes: state.carTypeReducer.postCarTypes,
        updateCarTypes: state.carTypeReducer.updateCarTypes,
        deleteCarTypes: state.carTypeReducer.deleteCarTypes,
        message: state.carTypeReducer.message,
        carTypes: state.carTypeReducer.carTypes,
        carType: state.carTypeReducer.carType,
    }
}

const mapDispatchToProps = {
    // Cars Actions
    carAdded,

    // CarTypes Actions
    carTypeData
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCar);