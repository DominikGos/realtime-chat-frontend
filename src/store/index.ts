import { createStore } from 'vuex';
import auth from './modules/auth';
import components from './modules/components';
import errors from './modules/errors';
import fileExtensions from './modules/fileExtensions';

const store = createStore({
    modules: {
        auth,
        components,
        errors,
        fileExtensions,
    }
})

export { store }