// core imports
import Vue from 'vue';
import VueRouter from 'vue-router';
import {sync} from 'vuex-router-sync';

// routes
import {routes} from './routes/routes';

// store
import {store} from './store/store';

// main app
import App from './components/App.vue';

// load styles
import mainStyles from './styles/main.scss';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

sync(store, router);

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
});
