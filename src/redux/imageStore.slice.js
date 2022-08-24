import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    status: 'idle',
    data: []
};

export const ImageStore = createSlice({
    name: 'imageStore',
    initialState,
    reducers: {
        setStore: (state, action) => {
            state.data = action.payload;
        },
      
    }
});


export const { setStore } = ImageStore.actions;

export default ImageStore.reducer;