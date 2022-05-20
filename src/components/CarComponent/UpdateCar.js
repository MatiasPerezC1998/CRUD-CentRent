import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { carUpdated } from '../../redux/actions/carAction';
import '../../Styles.css';

const UpdateCar = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id, registration, carTypeId } = state;
    const [updateRegistration, setRegistration] = useState(registration);
    const [updateCarTypeId, setCarTypeId] = useState(carTypeId);

    // EVENTS
    const handleSubmit = async (e) => {
        e.preventDefault();

        props.carUpdated(id, updateRegistration, updateCarTypeId);
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
                            <td className="header">Matrícula</td>
                            <td className="celda">
                                <input type="text" name={"registration"} value={updateRegistration}
                                    onChange={e => setRegistration(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Tipo</td>
                            <td className="celda">
                            <select onChange={e => setCarTypeId(e.target.value)} defaultValue={updateCarTypeId}>
                                <option key={0}></option>
                                {
                                    props.carTypes ? props.carTypes.map(({id, model, branch}) => {
                                        return <option key={id} value={id}>
                                            {branch} ({model})
                                        </option>
                                    }): null
                                }
                                
                            </select>
                            </td>
                        </tr>
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
        getImage: state.carReducer.getImage,
        postImage: state.carReducer.postImage,
        carMessage: state.carReducer.carMessage,
        imageMessage: state.carReducer.imageMessage,
        cars: state.carReducer.cars,
        image: state.carReducer.image
    }
}

const mapDispatchToProps = {
    carUpdated,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCar);