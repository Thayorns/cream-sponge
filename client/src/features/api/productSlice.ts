import { createSlice } from '@reduxjs/toolkit';
import { apiSlice } from './apiSlice';

type ProductPayload = {
    photo: string,
    title: string,
    price: number,
};

type IncreasedByCountPayload = {
    count: number;
};

type DeletePayload = {
    title: string;
};

type InitialState = {
    productArray: ProductPayload[];
    orderedArray: ProductPayload[];
};

const productSlice = createSlice({
    name: 'product',

    initialState: {
        productArray: [],
        orderedArray: [],
    } as InitialState,

    reducers: {
        buyCake(state, action) {
            const cake = action.payload;
            const isDuplicate = state.productArray.find(el => el.title === cake.title);
            if (!isDuplicate) {
                state.productArray.push(cake);
            }
        },
        deleteCake(state, action) {
            const { title } = action.payload as DeletePayload;
            state.productArray = state.productArray.filter((el) => el.title !== title);
        },
        dropCakes(state) {
            state.productArray = [];
            state.orderedArray = [];
        },
        increaseCount(state, action) {
            const { count } = action.payload as IncreasedByCountPayload;
            const originalArray = state.productArray;
            const newArray = [];
            for (let i = 0; i < count; i++) {
                newArray.push(...originalArray);
            }
            state.productArray = newArray;
        }
    },

    extraReducers: (builder) => {
        builder.addMatcher(apiSlice.endpoints.buyProduct.matchFulfilled, (state, action) => {
            const cake = action.payload as ProductPayload;
            const isDuplicate = state.orderedArray.find(el => el.title === cake.title);
            if (!isDuplicate) {
                state.orderedArray.push(cake);
            }
        })
    }
});

export const { buyCake, deleteCake, dropCakes, increaseCount } = productSlice.actions;
export default productSlice.reducer;
