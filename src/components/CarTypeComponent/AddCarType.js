import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carTypeAdded } from '../../redux/actions/carTypeAction';
import '../../Styles.css';

const AddCarType = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const [brand, setBrand] = useState('');
    const [model, setModel] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState('');

    // EVENTS
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('FormFile', image);
        data.append('FileName', image.name);

        await props.carTypeAdded(brand, model, type, image);
        navigate("/CarType");
    }

    const handleChangeImage = async (e) => {
        setImage(e.target.files[0]);
    }

    // BODY
    return (
        <div>
            <br />
            <form className="form" onSubmit={handleSubmit}>
                <table className="table">
                    <tbody>                     
                        <tr>
                            <td className="header">Marca</td>
                            <td className="celda">
                                <input type="text" name={"brand"} value={brand}
                                    onChange={e => setBrand(e.target.value)} />
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Modelo</td>
                            <td className="celda">
                                <input type="text" name={"model"} value={model}
                                    onChange={e => setModel(e.target.value)} />
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
                            <td className="header">Imagen</td>
                            <td className="celda">
                                <input type="file" name="image"
                                    onChange={handleChangeImage} />
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
        // CarTypes InitialState
        getCarTypes: state.carTypeReducer.getCarTypes,
        postCarTypes: state.carTypeReducer.postCarTypes,
        updateCarTypes: state.carTypeReducer.updateCarTypes,
        deleteCarTypes: state.carTypeReducer.deleteCarTypes,
        message: state.carTypeReducer.message,
        carTypes: state.carTypeReducer.carTypes
    }
}

const mapDispatchToProps = {
    carTypeAdded,
}

export default connect(mapStateToProps, mapDispatchToProps)(AddCarType);