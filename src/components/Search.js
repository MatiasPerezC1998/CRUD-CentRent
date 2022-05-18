import React, { useState } from 'react';
import { connect } from 'react-redux';

import { searchGet } from '../redux/actions/searchAction';
import { carsGet } from '../redux/actions/carAction';

import store from '../redux/store';
import '../Styles.css';

const Search = (props) => {

    // HOOKS
    const [name, setName] = useState("");

    // EVENTS
    const handleSubmit = (e) => {
        e.preventDefault();
        props.searchGet(name);
        props.carsGet(props.cars);
    }

    // BODY
    return (
        <div>
            <div>
                <form className="searchForm" onSubmit={handleSubmit}>
                    Buscar un cliente:
                    <input type="text" placeholder="Nombre"
                        onChange={e => setName(e.target.value)}/>
                    <br/><br/>
                    <button type="submit">Enviar</button>
                </form>
            </div>
            <br/>
            <span></span>
            <div className="searchInfo">
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
                    (props.cars && props.customer.carRentedId != 0) ? props.cars.filter(car => props.customer.carRentedId === car.id)
                        .map(({ name, registration, id}) => {
                        return <div key={id} value={id}>{registration} ({name})</div>
                    })
                    : 'No tiene ningun coche alquilado'
                }
            </div>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        // Search InitialState
        loadSearch: state.searchReducer.loadSearch,
        searched: state.searchReducer.searched,
        message: state.searchReducer.message,
        customer: state.searchReducer.customer,

        // Cars InitialState
        getCars: state.carReducer.getCars,
        postCars: state.carReducer.postCars,
        updateCars: state.carReducer.updateCars,
        deleteCars: state.carReducer.deleteCars,
        message: state.carReducer.message,
        cars: state.carReducer.cars,
        car: state.carReducer.car
    }
}

const mapDispatchToProps = {
    // Search Actions
    searchGet,

    // Car Actions
    carsGet
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);