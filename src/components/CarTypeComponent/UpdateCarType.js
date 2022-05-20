import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';

import { carUpdated } from '../../redux/actions/carAction';
import '../../Styles.css';

const UpdateCar = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const { state } = useLocation();
    const { id, model, brand, type, registration, isRented, image } = state;
    const [updateModel, setModel] = useState(model);
    const [updateBrand, setBrand] = useState(brand);
    const [updateType, setType] = useState(type);
    const [updateRegistration, setRegistration] = useState(registration);
    const [updateIsRented, setIsRented] = useState(isRented);
    const [updateImage, setImage] = useState((image !== null) ? image : '');

    // EVENTS
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsRented(0);

        const data = new FormData();
        data.append('FormFile', updateImage);
        data.append('FileName', updateImage.name);
        console.log(updateImage);

        props.carUpdated(id, updateModel, updateBrand, updateType, updateRegistration, updateIsRented, updateImage);
        navigate("/Car");
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
                            <td className="header">Matrícula</td>
                            <td className="celda">
                                <input type="text" name={"registration"} value={updateRegistration}
                                    onChange={e => setRegistration(e.target.value)}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="header">Imagen</td>
                            <td className="celda">
                                <input type="file" name="image"
                                    onChange={handleChangeImage} />
                                {/* <input type="text" name={"image"} value={updateImage}
                                    onChange={e => setImage(e.target.value)} /> */}
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