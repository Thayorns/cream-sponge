import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from '../api/apiSlice';

type InitialState = {
    coffee: number;
};
type CoffeePayload = {
    coffee: number;
};

const coffeeSlice = createSlice({
    name: 'coffee',

    initialState: {
        coffee: 0,
    } as InitialState,

    reducers: {},

    extraReducers: (builder) => {
        builder
        .addMatcher(apiSlice.endpoints.getCoffee.matchFulfilled, (state:InitialState, action: any) => {
            const {coffee} = action.payload as CoffeePayload;
            state.coffee = coffee;
        })
    },
});
export default coffeeSlice.reducer;