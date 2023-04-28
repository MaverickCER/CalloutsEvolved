import { ref, update } from 'firebase/database';

import React from 'react';
import { database } from '../../firebase/firebaseClient';
import { useAuth } from '../../context/AuthContext';
import { useSettings } from '../../context/SettingsContext';

const UpdateColor = () => {
  const { currentUser, userData } = useAuth();
  const { theme } = useSettings();

  const sendColor = async (color) => {
    let updates = {};
    updates[`userData/${currentUser.uid}/color`] = color;
    update(ref(database), updates);
  };

  return (
    <div>
      <p>User Color</p>
      <button
        onClick={() => {
          sendColor('a');
        }}
        style={{
          border: 'none',
          backgroundColor: userData.color === 'a' ? `rgb(${theme.cba})` : 'transparent',
          color: userData.color === 'a' ? `rgb(${theme.cca})` : `rgb(${theme.mca})`,
        }}>
        a
      </button>
      <button
        onClick={() => {
          sendColor('b');
        }}
        style={{
          border: 'none',
          backgroundColor: userData.color === 'b' ? `rgb(${theme.cbb})` : 'transparent',
          color: userData.color === 'b' ? `rgb(${theme.ccb})` : `rgb(${theme.mca})`,
        }}>
        b
      </button>
      <button
        onClick={() => {
          sendColor('c');
        }}
        style={{
          border: 'none',
          backgroundColor: userData.color === 'c' ? `rgb(${theme.cbc})` : 'transparent',
          color: userData.color === 'c' ? `rgb(${theme.ccc})` : `rgb(${theme.mca})`,
        }}>
        c
      </button>
      <button
        onClick={() => {
          sendColor('d');
        }}
        style={{
          border: 'none',
          backgroundColor: userData.color === 'd' ? `rgb(${theme.cbd})` : 'transparent',
          color: userData.color === 'd' ? `rgb(${theme.ccd})` : `rgb(${theme.mca})`,
        }}>
        d
      </button>
      <button
        onClick={() => {
          sendColor('e');
        }}
        style={{
          border: 'none',
          backgroundColor: userData.color === 'e' ? `rgb(${theme.cbe})` : 'transparent',
          color: userData.color === 'e' ? `rgb(${theme.cce})` : `rgb(${theme.mca})`,
        }}>
        e
      </button>
      <button
        onClick={() => {
          sendColor('f');
        }}
        style={{
          border: 'none',
          backgroundColor: userData.color === 'f' ? `rgb(${theme.cbf})` : 'transparent',
          color: userData.color === 'f' ? `rgb(${theme.ccf})` : `rgb(${theme.mca})`,
        }}>
        f
      </button>
    </div>
  );
};

export default UpdateColor;
