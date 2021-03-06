import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { categoryStartAddNew } from '../../actions/category';
import { Navbar } from '../ui/Navbar';

export const CategoryNew = ({ history }) => {
  const [name, setName] = useState('');
  const [state] = useState(1);
  const [validText, setValidText] = useState(true);

  const dispatch = useDispatch();

  const { uid } = useSelector(state => state.auth);

  const [user_id] = useState(uid);

  const addCategory = category => dispatch(categoryStartAddNew(category));

  const submitNewCategory = e => {
    e.preventDefault();

    if(name.trim().length < 3) {
        return setValidText(false);
    }

    addCategory({
      name,
      state,
      user_id
    });

    history.push('/category');
  }

  return (
      <>
        <Navbar />
        <div className="container">
              <div className="row justify-content-center">
                  <div className="col-md-8">
                      <div className="card mb-4">
                          <div className="card-body">
                              <h2 className="text-center mb-4 font-weight-bold">
                                  New Category
                              </h2>

                              <form
                                  onSubmit={ submitNewCategory }
                              >
                                  <div className="form-group">
                                      <label>Name</label>
                                      <input
                                          type="text"
                                          className={ `form-control ${ !validText && 'is-invalid' }` }
                                          placeholder="Name"
                                          name="name"
                                          value={ name }
                                          onChange={ e => setName(e.target.value) }
                                      />
                                      { !validText ? <span className="alert-span">Name more than two letters</span> : null }
                                  </div>

                                  <button 
                                      type="submit"
                                      className="btn btn-primary font-weight-bold text-uppercase d-block w-100 mt-5"
                                  >Add category</button>
                              </form>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </>
  )
}
