import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Modal from 'react-modal';
import DateTimePicker from 'react-datetime-picker';
import moment from 'moment';

import { uiCloseModalInflow } from '../../actions/ui';

const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
};
Modal.setAppElement('#root');

const now = moment().minutes(0).seconds(0).add(1, 'hours'); // 3:00:00

export const OperationInflowModal = () => {
    const { modalOpenInflow } = useSelector(state => state.ui);
    const dispatch = useDispatch();

    const [dateStart, setDateStart] = useState(now.toDate());
    const [conceptValid, setConceptValid] = useState(true);
    const [amountValid, setAmountValid] = useState(true);

    const [formValues, setFormValues] = useState({
        concept: 'Job',
        amount: '45000',
        date: now.toDate() 
    });

    const { concept, amount } = formValues;

    const handleInputChange = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const closeModal = () => {
        dispatch(uiCloseModalInflow());
    }

    const handleStartDateChange = (e) => {
        setDateStart(e);
        setFormValues({
            ...formValues,
            date: e
        });
    }

    const handleSubmitForm = (e) => {
        e.preventDefault();

        if(concept.trim().length < 3) {
            return setConceptValid(false);
        }

        if(amount.trim().length === 0) {
            return setAmountValid(false);
        }
        
        // Realizar grabación

        setConceptValid(true);
        setAmountValid(true);
        closeModal();
    }

    return (
        <Modal
            isOpen={ modalOpenInflow }
            onRequestClose={ closeModal }
            style={ customStyles }
            closeTimeoutMS={ 200 }
            className="modal"
            overlayClassName="modal-fondo"
        >
            <h1>New money inflow</h1>
            <hr />
            <form 
                className="container"
                onSubmit={ handleSubmitForm }
            >

                <div className="form-group">
                    <label>Concept</label>
                    <input 
                        type="text"
                        className={ `form-control ${ !conceptValid && 'is-invalid' }` } placeholder="Concept"
                        name="concept"
                        autoComplete="off"
                        value={ concept }
                        onChange={ handleInputChange }
                    />
                </div>

                <div className="form-group">
                    <label>Amount</label>
                    <input 
                        type="text"
                        className={ `form-control ${ !amountValid && 'is-invalid' }` } placeholder="Amount"
                        name="amount"
                        autoComplete="off"
                        value={ amount }
                        onChange={ handleInputChange }
                    />
                </div>

                <div className="form-group">
                    <label>Date</label>
                    <DateTimePicker
                        onChange={ handleStartDateChange }
                        value={ dateStart }
                        className="form-control"
                    />
                </div>

                <button
                    type="submit"
                    className="btn btn-outline-primary btn-block"
                >
                    <i className="far fa-save"></i>
                    <span> Save</span>
                </button>

            </form>
        </Modal>
    )
}