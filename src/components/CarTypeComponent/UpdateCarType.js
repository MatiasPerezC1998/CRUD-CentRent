import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { carTypeUpdated } from '../../redux/actions/carTypeAction';
import '../../Styles.css';

const UpdateCarType = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id, brand, model, type, image } = state;
    const [updateBrand, setBrand] = useState(brand);
    const [updateModel, setModel] = useState(model);
    const [updateType, setType] = useState(type);
    const [updateImage, setImage] = useState((image !== null) ? image : '');

    // EVENTS
    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();
        data.append('FormFile', updateImage);
        data.append('FileName', updateImage.name);
        console.log(updateImage);

        props.carTypeUpdated(id, updateBrand, updateModel, updateType, updateImage);
        navigate("/CarType");
    }

    const handleChangeImage = async (e) => {
        setImage(e.target.files[0]);
    }

    // BODY
    return (
        <div>
            <br/>
            <form className="form" onSubmit={handleSubmit}>
                <table className="table">
                    <tbody>                    
                        <tr>
                            <td className="header">Marca</td>
                            <td className="celda">
                                <input type="text" name={"brand"} value={updateBrand}
                                    onChange={e => setBrand(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Model</td>
                            <td className="celda">
                                <input type="text" name={"model"} value={updateModel}
                                    onChange={e => setModel(e.target.value)}/>
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
                            <td className="header">Imagen</td>
                            <td className="celda">
                                <input type="file" name="image"
                                    onChange={handleChangeImage} />
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
    carTypeUpdated,
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCarType);