// core imports
import Vue from 'vue';
import VueRouter from 'vue-router';

// routes
import {routes} from './routes';

// main app
import App from './App.vue';

// load styles
import mainStyles from './styles/main.scss';

Vue.use(VueRouter);

const router = new VueRouter({
    routes
});

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    render: h => h(App)
});
