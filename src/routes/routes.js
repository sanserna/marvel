import Home from '../components/Home.vue';
import CharacterDetail from '../components/CharacterDetail.vue';

export const routes = [{
    path: '/',
    component: Home
}, {
    path: '/character_detail/:id',
    component: CharacterDetail,
    props: true
}];
