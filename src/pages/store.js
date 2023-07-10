// redux 관리 파일

import { configureStore, createSlice } from '@reduxjs/toolkit';
// state 생성
const user = createSlice({
    name:'user',
    // initialState:'홍길동',
    initialState:{name:'홍길동',memberYear:1},
    
    reducers:{

        changeName(state,action) {
            state.name = action.payload;
        },
        changeYear(state,action) {
            state.memberYear += action.payload;
        }
    }
});

const itemCount = createSlice({
    name:'itemCount',
    initialState:0
})

const cart = createSlice({
    name:'cart',
    // initialState:[],
    initialState:{
        list:[],
        totalCount:0,
        totalPrice:0
    },

    reducers:{
        addItem(state,action) {
            console.log(action.payload.id);
            const index = state.list.findIndex((findID) => {
                return findID.id === action.payload.id; 
            });
            console.log(index);
            if (index > -1) {
                state.list[index].count++;
                state.list[index].pricetotal += state.list[index].price;
                state.totalCount++;
                state.totalPrice+=state.list[index].price;
            }
            else {
                state.list.push(action.payload);
                state.totalCount++;
                state.totalPrice+=action.payload.price;
            }
        },
        cntItemCount(state,action) {
            const index = state.list.findIndex((findID) => {
                return findID.id === action.payload[0].id; 
            });
            console.log(index);

            if (index > -1) {
                if (action.payload[1] === 'inc') {
                    state.list[index].count++;
                    state.list[index].pricetotal += state.list[index].price;
                    state.totalPrice += state.list[index].price;
                    state.totalCount++;
                };

                if (action.payload[1] === 'dec') {
                    if (state.list[index].count > 1) {
                        state.list[index].count--;
                        state.list[index].pricetotal -= state.list[index].price;
                        state.totalPrice -= state.list[index].price;
                        state.totalCount--;
                    }
                }
            }


        },
        removeItem(state,action) {
            const index = state.list.findIndex((findID) => {
                return findID.id === action.payload.id; 
            });
            console.log(index);
            if (index > -1) {
                state.totalCount -= state.list[index].count;
                state.totalPrice -= state.list[index].pricetotal;
                state.list.splice(index,1);
            }

        }
    }
})

export const {addItem,removeItem,cntItemCount} = cart.actions;

export const { changeName ,changeYear} = user.actions;
// 변경 함수

// 상태
export default configureStore({
    reducer:{
        user: user.reducer,
        itemCount:itemCount.reducer,
        cart:cart.reducer
    }
})