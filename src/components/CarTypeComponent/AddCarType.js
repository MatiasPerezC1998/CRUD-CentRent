import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { carAdded } from '../../redux/actions/carAction';
import '../../Styles.css';

const AddCar = (props) => {

    // HOOKS
    const navigate = useNavigate();
    const [model, setModel] = useState('');
    const [brand, setBrand] = useState('');
    const [type, setType] = useState('');
    const [registration, setRegistration] = useState('');
    const [isRented, setIsRented] = useState('');
    const [image, setImage] = useState('');

    // EVENTS
    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsRented(0);

        const data = new FormData();
        data.append('FormFile', image);
        data.append('FileName', image.name);
        console.log(image)

        await props.carAdded(model, brand, type, registration, isRented, image);
        navigate("/Car");
    }

    const handleChangeImage = async (e) => {
        setImage(e.target.files[0]);
    }

    console.log(image);
    console.log(image.name);

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
                            <td className="header">Matrícula</td>
                            <td className="celda">
                                <input type="text" name={"registration"} value={registration}
                                    onChange={e => setRegistration(e.target.value)} />
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