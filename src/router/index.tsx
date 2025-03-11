import Search from "@/views/search"
import { lazy } from "react"
import { Navigate } from "react-router-dom"
import type { RouteObject } from "react-router-dom"
// import Discover from "@/views/discover"
// import Download from "@/views/download"
// import Focus from "@/views/focus"
// import Mine from "@/views/mine"

// 路由懒加载（组件）--分包处理（提高渲染速度）
const Discover = lazy(() => import('@/views/discover')) // 一级路由
const Recommend = lazy(() => import('@/views/discover/c-views/recommend')) //二级路由
const Ranking = lazy(() => import('@/views/discover/c-views/ranking'))
const Songs = lazy(() => import('@/views/discover/c-views/songs'))
const Djradio = lazy(() => import('@/views/discover/c-views/djradio'))
const Artist = lazy(() => import('@/views/discover/c-views/artist'))
const Album = lazy(() => import('@/views/discover/c-views/album'))

const Mine = lazy(() => import('@/views/mine'))
const Focus = lazy(() => import('@/views/focus'))
const Download = lazy(() => import('@/views/download'))
const Player = lazy(() => import('@/views/player'))

const routes: RouteObject[] = [
    {
        path: '/',
        element: <Navigate to="/discover" />
    },
    {
        path: '/discover',
        element: <Discover />, // 组件对象
        children: [
            {
                path: '/discover',
                element: <Navigate to="/discover/recommend" /> // JSX的value，“”
            },
            {
                path: '/discover/recommend',
                element: <Recommend />
            },
            {
                path: '/discover/ranking',
                element: <Ranking />
            },
            {
                path: '/discover/songs',
                element: <Songs />
            },
            {
                path: '/discover/djradio',
                element: <Djradio />
            },
            {
                path: '/discover/artist',
                element: <Artist />
            },
            {
                path: '/discover/album',
                element: <Album />
            }
        ]
    },
    {
        path: '/mine',
        element: <Mine />
    },
    {
        path: '/focus',
        element: <Focus />
    },
    {
        path: '/download',
        element: <Download />
    },
    {
        path: '/player',
        element: <Player />
    },
    {
        path: '/search',
        element: <Search />
    }
]

export default routes