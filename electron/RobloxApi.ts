/* eslint-disable no-console */
// eslint-disable-next-line import/no-extraneous-dependencies
import fetch, { Headers } from 'node-fetch';
import { type UserData } from '../src/types/type';

const fetchUserData = async (cookie: string) => {
  const myHeaders = new Headers();
  myHeaders.append('cookie', `.ROBLOSECURITY=${cookie};`);

  const requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: undefined
  };

  try {
    const response = await fetch('https://users.roblox.com/v1/users/authenticated', requestOptions);
    const result = await response.json();
    return result as UserData;
  } catch (error: any) {
    if (error.response && error.response.data.errors[0].code === 0) {
      // If the error code is 0, it means the cookie is invalid.µ
      console.warn('Error while fetching user data:', error.response.data.errors[0].message);
      console.warn('Invalid cookie provided in config.json. Please provide a valid cookie.');
      return false;
    }
    console.error('An error occurred while fetching user data:', error);
    return false;
  }
};

export { fetchUserData };