import { createStore } from 'vuex';
import auth from './modules/auth';
import components from './modules/components';

const store = createStore({
    modules: {
        auth,
        components,
    }
})

export { store }