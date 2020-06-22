import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';
import PersonIcon from '@material-ui/icons/Person';

const Navbar = ({ auth: { isAuthenticated, loading, user = {} }, logout }) => {
  const authLinks = (
    <ul>
      <li className='logged-user'>
        <div className='profile-icon'>
          <PersonIcon />
        </div>

        {isAuthenticated && user !== null
          ? `${user.firstName} ${user.lastName}`
          : ''}
      </li>
      <li className='profile-icon'>
        <Link to='/' onClick={logout}>
          Wyloguj
        </Link>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/register'>Rejestracja</Link>
      </li>
      <li>
        <Link to='/login'>Logowanie</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i> eLekcje
        </Link>
      </h1>
      {!loading && (
        <Fragment>{isAuthenticated ? authLinks : guestLinks}</Fragment>
      )}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logout }
)(Navbar);
