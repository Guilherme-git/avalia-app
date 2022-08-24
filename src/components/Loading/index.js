import React from 'react';
import { ActivityIndicator } from 'react-native';

export default Loading = () => {
    return(
        <ActivityIndicator color={'#3D4684'} size="large" style={{marginTop: 10}} />
    )
}