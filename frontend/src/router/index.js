import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect:'/home'
    },{
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/login.vue')
    },{
      path: '/',
      name: 'index',
      component: () => import('@/views/layout/layout.vue'),
      children:[{
        path: '/home',
        name: 'home',
        component: () => import('@/views/index/index.vue'),
        meta: { requiresAuth: false }
      },{
        path: '/create',
        name: 'create',
        component: () => import('@/views/create/create.vue'),
        meta: { requiresAuth: true }
      },{
        path: '/user/:id',
        name: 'user',
        component: () => import('@/views/user/user.vue'),
        meta: { requiresAuth: true },
        children:[{
          path: '/user/:id/home',
          component: () => import('@/views/user/home/home.vue'),
          children:[{
            path: '/user/:id/home/noteslist',
            component: () => import('@/views/user/home/notesList/noteslist.vue'),
          },{
            path: '/user/:id/home/columns',
            component: () => import('@/views/user/home/columnsList/columnsList.vue'),
          }]
        },{
          path: '/user/:id/concerns',
          component: () => import('@/views/user/concern/concern.vue'),
        },{
          path: '/user/:id/favors',
          component: () => import('@/views/user/favor/favor.vue'),
        },{
          path: '/user/:id/update',
          component: () => import('@/views/user/update/update.vue'),
        }]
      },{
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/my.vue'),
        meta: { requiresAuth: true }
      }]
    },{
      path: '/note/:id',
      name: 'note',
      component: () => import('@/views/noteDetails/noteDetails.vue'),
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.meta.requiresAuth) {
    if (token) {
      next();
    } else {
      next('/login');
    }
  } else {
    next();
  }
})


export default router
