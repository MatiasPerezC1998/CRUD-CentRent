import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carAdded } from '../../redux/actions/carAction';
import '../../Styles.css';

const AddCar = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const [registration, setRegistration] = useState('');
    const [carTypeId, setCarTypeId] = useState('');

    // EVENTS
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
        getImage: state.carReducer.getImage,
        postImage: state.carReducer.postImage,
        carMessage: state.carReducer.carMessage,
        imageMessage: state.carReducer.imageMessage,
        cars: state.carReducer.cars,
        image: state.carReducer.image
    }
}

const mapDispatchToProps = {
    carAdded,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCar);