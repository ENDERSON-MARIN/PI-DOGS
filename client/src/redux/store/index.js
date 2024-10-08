import { createStore, applyMiddleware} from "redux";
import reducer from "../reducer/index";
import { composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk";


const store = createStore(reducer,
    composeWithDevTools(applyMiddleware(thunk)));//thunk es para poder hacer acciones con promesas

export default store;