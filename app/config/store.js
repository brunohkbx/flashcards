import { createStore } from 'redux';
import devToolsEnhancer from 'remote-redux-devtools';
import rootReducer from '../reducers';

const store = createStore(rootReducer, devToolsEnhancer({realtime: true, port: 8000}));

export default store;
