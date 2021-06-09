import { combineReducers } from "redux";
import thunk from "redux-thunk";
import sessionReducer from './session';
import { configureStore } from '@reduxjs/toolkit'
import {useDispatch} from 'react-redux'

const rootReducer = combineReducers({
  session: sessionReducer,
});



let enhancer: any;

if (process.env.NODE_ENV === "production") {
  enhancer = [thunk];
} else {
  const logger = require("redux-logger").default;
  enhancer = [thunk, logger];
}

export const store = configureStore({
  reducer: rootReducer,
  enhancers: enhancer
})

// const configureStore = (preloadedState?: any) => {
//   return createStore(rootReducer, preloadedState, enhancer);
// };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()


export default configureStore;
