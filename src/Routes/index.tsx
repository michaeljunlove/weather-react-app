// 路由
import { useRoutes, Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import Home from '../Home';
import Detail from '../Detail';
import PageNotFoud from '../Components/PageNotFoud';
const routes: RouteObject[] = [
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/detail',
        element: <Detail />
    },
    {
        path: '/404',
        element: <PageNotFoud />
    },
    {
        path: '*',
        element: <Navigate replace to="/404" />
    }
];

export default function Routes() {
    const element = useRoutes(routes);
    return element;
}
