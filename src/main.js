import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import * as VueGoogleMaps from "vue2-google-maps";
import {googleMaps} from "./env/env";

Vue.use(VueGoogleMaps, {
    load: {
        key: googleMaps.key,
        libraries: "places" // necessary for places input
    }
});

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');
