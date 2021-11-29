import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserInfoComponent from '../Feature/UserInfo';

export default function HomeComponent() {
  const [loading, setLoading] = useState(true);
  const [infoUser, setInfoUser] = useState();

  useEffect(() => {
    axios.get("https://reqres.in/api/users").then(response => {
      setInfoUser(response?.data?.data);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div className="App">Loading...</div>;
  }

  return (
    <>
      {infoUser.map(action => (
        <UserInfoComponent UserInfo={action} />
      ))}
    </>
  );
}
