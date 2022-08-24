import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';

export default Alert = ({show, showProgress, title, message}) => {
    return(
        <AwesomeAlert
        show={show}
        showProgress={show}
        title={title}
        message={message}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="Ok"
        confirmButtonColor="#DD6B55"
        onCancelPressed={() => {
          this.hideAlert();
        }}
        onConfirmPressed={() => {
          this.hideAlert();
        }}
      />
    )
}