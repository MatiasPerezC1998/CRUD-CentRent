import React, { useState } from 'react';
import { connect } from 'react-redux';

import { searchCustomer, searchCar } from '../redux/actions/searchAction';
import { carsData } from '../redux/actions/carAction';

import '../Styles.css';

const Search = (props) => {

    // HOOKS
    const [email, setEmail] = useState("");
    const [registration, setRegistration] = useState("");

    // EVENTS
    const handleCustomerSubmit = (e) => {
        e.preventDefault();
        props.searchCustomer(email);
        props.carsData(props.cars);
    }

    const handleCarSubmit = (e) => {
        e.preventDefault();
        props.searchCar(registration);
    }

    // BODY
    return (
        <div>
            {/* SEARCH CUSTOMER FORM */}
            <div>
                <form className="searchCustomerForm" onSubmit={handleCustomerSubmit}>
                    Buscar un cliente:
                    <input type="text" placeholder="Correo Electrónico"
                        onChange={e => setEmail(e.target.value)} />
                    <br/><br/>
                    <button type="submit">Buscar</button>
                </form>
            </div>
            <br/>
            <span></span>
            <div className="searchCustomerInfo">
                <b>Id:</b>&nbsp;{props.customer.id}
                <br/><br/>
                <b>Name:</b>&nbsp;{props.customer.name}
                <br/><br/>
                <b>Surname:</b>&nbsp;{props.customer.surname}
                <br/><br/>
                <b>Correo Electrónico:</b>&nbsp;{props.customer.email}
                <br/><br/>
                <b>Dni:</b>&nbsp;{props.customer.dni}
                <br/><br/>
                <b>Teléfono:</b>&nbsp;{props.customer.phone}
                <br/><br/>
                <b>Coche Alquilado:</b>&nbsp;
                {
                    (props.cars && props.customer.carRentedId !== 0) ?
                        props.cars.filter(car => props.customer.carRentedId === car.id)
                            .map(({ registration, model, id}) => {
                                return <div key={id} value={id}>{registration} ({model})</div>
                            }) : 'No tiene ningun coche alquilado'
                }
            </div>

            {/* SEARCH CAR FORM */}
            <div>
                <form className="searchCarForm" onSubmit={handleCarSubmit}>
                    Buscar un coche:
                    <input type="text" placeholder="Matrícula"
                        onChange={e => setRegistration(e.target.value)} />
                    <br/><br/>
                    <button type="submit">Buscar</button>
                </form>
            </div>
            <br/>
            <span></span>
            <div className="searchCarInfo">
                <b>Id:</b>&nbsp;{props.searchedCar.id}
                <br/><br/>
                <b>Nombre:</b>&nbsp;{props.searchedCar.name}
                <br/><br/>
                <b>Marca:</b>&nbsp;{props.searchedCar.brand}
                <br/><br/>
                <b>Tipo:</b>&nbsp;{props.searchedCar.type}
                <br/><br/>
                <b>Matrícula:</b>&nbsp;{props.searchedCar.registration}
                <br/><br/>
                <b>Disponible:</b>&nbsp;
                {
                    (props.searchedCar.isRented === undefined) ? 
                        "" : (props.searchedCar.isRented === 0) ?
                            '✔️' : '❌'
                }
                <br/><br/>
                <b>Imagen:</b>&nbsp;
                {
                    (props.searchedCar.image === undefined) ? 
                        "" : (props.searchedCar.image === null) ? "Sin imagen"
                            : <img className="carImage" alt={props.searchedCar.image} src={"https://localhost:7295/Car/GetImage?imageUrl=" + props.searchedCar.image}/>
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        // Search InitialState
        customerSearch: state.searchReducer.customerSearch,
        customerFound: state.searchReducer.customerFound,
        carSearch: state.searchReducer.carSearch,
        carFound: state.searchReducer.carFound,
        searchMessage: state.searchReducer.message,
        customer: state.searchReducer.customer,
        searchedCar: state.searchReducer.car,

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
        car: state.carReducer.car,
        image: state.carReducer.image
    }
}

const mapDispatchToProps = {
    // Search Actions
    searchCustomer,
    searchCar,

    // Car Actions
    carsData
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);