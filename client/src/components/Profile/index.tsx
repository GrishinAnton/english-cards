import { RootState } from 'typesafe-actions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getProfileAsync } from './actions';

const Profile = () => {
  const dispatch = useDispatch();

  const profile = useSelector((state: RootState) => state.profile.profile);
  
  useEffect(() => {
    dispatch(getProfileAsync.request());
  }, []);

  if (profile === null) {
    return <>Нет данных для отображения</>;
  }

  return (
    <div>
      <h2>Профиль</h2>
      <ul>
        <li>Email: {profile.email || '-'}</li>
        <li>Имя: {profile.name || '-'}</li>
        <li>Фамилия: {profile.surname || '-'}</li>
        <li>Пол: {profile.sex || '-'}</li>
        <li>Город: {profile.city || '-'}</li>
        <li>День рождения: {profile.bithday || '-'}</li>
      </ul>
    </div>
  );
};

export default Profile;
