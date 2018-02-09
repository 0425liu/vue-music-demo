import Vue from 'vue';
import Router from 'vue-router';
/* jshint ignore:start */
const Recommend = (resolve) => {
    import ('components/recommend/recommend').then((module) => {
        resolve(module)
    })
}

const Singer = (resolve) => {
    import ('components/singer/singer').then((module) => {
        resolve(module)
    })
}

const Rank = (resolve) => {
    import ('components/rank/rank').then((module) => {
        resolve(module)
    })
}

const Search = (resolve) => {
    import ('components/search/search').then((module) => {
        resolve(module)
    })
}

const SingerDetail = (resolve) => {
    import ('components/singer-detail/singer-detail').then((module) => {
        resolve(module)
    })
}

const Disc = (resolve) => {
    import ('components/disc/disc').then((module) => {
        resolve(module)
    })
}

const TopList = (resolve) => {
    import ('components/toplist/toplist').then((module) => {
        resolve(module)
    })
}

const User = (resolve) => {
    import ('components/user/user').then((module) => {
        resolve(module)
    })
}


Vue.use(Router)

export default new Router({
    routes: [{
            path: "/",
            redirect: '/recommend'
        },
        {
            path: '/recommend',
            component: Recommend,
            children: [{
                path: ":id",
                component: Disc
            }]

        }, {
            path: '/singer',
            component: Singer,
            children: [{
                path: ":id",
                component: SingerDetail
            }]
        },
        {
            path: '/rank',
            component: Rank,
            children: [{
                path: ":id",
                component: TopList
            }]
        },
        {
            path: '/search',
            component: Search,
            children: [{
                path: ":id",
                component: SingerDetail
            }]
        },
        {
            path: '/user',
            component: User
        }
    ]
})