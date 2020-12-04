import React from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ProfileForm from '../../components/profile-form/ProfileForm';

function Register() {
  const history = useHistory();

  const handleSubmit = (customer) => {
    axios.post('http://localhost:3001/register', { customer: customer }, { withCredentials: true }).then(() => {
      history.push('/login');
    });
  };

  return (
    <div>
      <ProfileForm
        customer={{}}
        title='Create an account'
        buttonLabel='Create'
        showId={false}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

export default Register;
