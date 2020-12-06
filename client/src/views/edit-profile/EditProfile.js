import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import ValidationForm from '../../components/validation/ValidationForm';
import ProfileForm from '../../components/profile-form/ProfileForm';

function EditProfile() {
  const history = useHistory();
  const [customer, setCustomer] = useState();
  const [loginJSX, setLoginJSX] = useState();
  const [profileJSX, setProfileJSX] = useState();
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  const fetchCustomer = () => {
    axios
      .get('https://the-drenched-cheese-financial.herokuapp.com/customer', {
        withCredentials: true,
      })
      .then((res) => {
        setIsPageLoaded(true);
        if (res.data) {
          setCustomer(res.data);
        }
      });
  };

  const renderLoginJSX = () => {
    const handleValidate = () => {
      history.push('/profile/edit');
      fetchCustomer();
    };

    if (isPageLoaded && !customer) {
      setLoginJSX(<ValidationForm isFromRedirect={true} onValidate={handleValidate} />);
    } else {
      setLoginJSX();
    }
  };

  const renderProfileJSX = () => {
    const handleSubmit = (customer) => {
      axios.post('https://the-drenched-cheese-financial.herokuapp.com/editprofile', { customer: customer }, { withCredentials: true }).then(() => {
        history.push('/profile');
      });
    };

    if (customer) {
      setProfileJSX(
        <ProfileForm
          customer={customer}
          title='Edit your profile information'
          buttonLabel='Save'
          showId={true}
          onSubmit={handleSubmit}
        />
      );
    } else {
      setProfileJSX();
    }
  };

  useEffect(fetchCustomer, []);
  useEffect(renderLoginJSX, [customer, isPageLoaded, history]);
  useEffect(renderProfileJSX, [customer, history]);

  return (
    <div>
      {loginJSX}
      {profileJSX}
    </div>
  );
}

export default EditProfile;
