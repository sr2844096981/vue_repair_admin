import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () =>
            import ( /* webpackChunkName: "Login" */ '../views/Login/Login.vue')
    },
    {
        path: '/home',
        name: 'Home',
        component: () =>
            import ( /* webpackChunkName: "Home" */ '../viewsRepair/Home.vue'),
        children: [{
                path: '/index',
                component: () =>
                    import ( /* webpackChunkName: "Index" */ '../viewsRepair/Index'),
            }, {
                path: '/notice',
                component: () =>
                    import ( /* webpackChunkName: "Notice" */ '../viewsRepair/Notice'),
            }, {
                path: '/order',
                component: () =>
                    import ( /* webpackChunkName: "Order" */ '../viewsRepair/Order'),
            }, {
                path: '/order/detail/:id',
                component: () =>
                    import ( /* webpackChunkName: "OrderDetail" */ '../viewsRepair/Order/detail'),
            }, {
                path: '/staff',
                component: () =>
                    import ( /* webpackChunkName: "Staff" */ '../viewsRepair/Staff'),
            }, {
                path: '/QRcode',
                component: () =>
                    import ( /* webpackChunkName: "ORcode" */ '../viewsRepair/QRcode'),
            }, {
                path: '/addQRcode/:id',
                component: () =>
                    import ( /* webpackChunkName: "AddQRcode" */ '../viewsRepair/QRcode/addQRcode'),
            },
            // 数据展示
            {
                path: '/showdata',
                component: () =>
                    import ( /* webpackChunkName: "ShowData" */ '../viewsRepair/ShowData'),
            }, {
                path: '/dynamic',
                component: () =>
                    import ( /* webpackChunkName: "dynamic" */ '../viewsRepair/Dynamic'),
            }, {
                path: '/demo',
                component: () =>
                    import ( /* webpackChunkName: "Demo" */ '../components/demo.vue'),
            },
        ]
    },


    // 打印二维码页
    {
        path: '/printingQRcode',
        component: () =>
            import ( /* webpackChunkName: "printingQRcode" */ '../viewsRepair/QRcode/printingQRcode'),
    },
    // 错误提示页
    {
        path: '/error',
        component: () =>
            import ( /* webpackChunkName: "ErrorMessage" */ '../components/ErrorMessage/ErrorOther.vue'),
    },
    {
        path: '/error404',
        component: () =>
            import ( /* webpackChunkName: "ErrorMessage" */ '../components/ErrorMessage/Error404.vue'),
    }

]

const router = new VueRouter({
    routes
})


// 路由导航守卫
router.beforeEach((to, from, next) => {
    if (to.path === '/login') return next()
    const tokenStr = window.localStorage.getItem('userInfo')
    if (!tokenStr) return next('/login')
    next()
})


// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
    //修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}



export default router