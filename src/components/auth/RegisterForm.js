import React from 'react';


const RegisterForm = ({ handleChange, handleSubmit, user, errors }) => {
  return (
    <div className="container ">
      <div className="marginDiv"></div>

      <form className="authForm" onSubmit={handleSubmit}>
        <div className="form-group">
          {errors.username && <p className="errorMsg">{errors.username}</p>}
          <input
            type="text"
            name="username"
            placeholder="Username"
            onChange={handleChange}
            value={user.username}
            className="form-control"
          />
        </div>

        <div className="form-group">
          {errors.email && <p className="errorMsg">{errors.email}</p>}
          <input
            type="text"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            value={user.email}
            className="form-control"
          />
        </div>


        <div className="form-group">
          {errors.password && <p className="errorMsg">{errors.password}</p>}
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={user.password}
            className="form-control"
          />

        </div>
        <div className="form-group">
          {errors.passwordConfirmation && <p className="errorMsg">{errors.passwordConfirmation}</p>}
          <input
            type="password"
            name="passwordConfirmation"
            placeholder="Confirm Password"
            onChange={handleChange}
            value={user.passwordConfirmation}
            className="form-control"
          />
        </div>

        <button className="main-button">Register</button>
      </form>
    </div>
  );
};

export default RegisterForm;
