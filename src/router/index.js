import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Game from '../views/Game.vue'
import Metro from "../views/Metro";

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/about',
    name: 'about',
    component: About,
  },
  {
    path: '/flappy_ia',
    name: 'flappy_ia',
    component: Game,
    props: {name: 'flappy_ia'}
  },
  {
    path: '/cube_race',
    name: 'cube_race',
    component: Game,
    props: {name: 'cube_race'}
  },
  {
    path: '/metro',
    name: 'metro',
    component: Metro,
  },
  {
    path: '*',
    redirect: '/'
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
