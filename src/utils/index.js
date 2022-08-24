import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getToken = AsyncStorage.getItem('@avalia_token')