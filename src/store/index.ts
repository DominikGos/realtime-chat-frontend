import { createStore } from 'vuex';
import auth from './modules/auth';
import components from './modules/components';
import errors from './modules/errors';

const store = createStore({
    modules: {
        auth,
        components,
        errors,
    }
})

export { store }