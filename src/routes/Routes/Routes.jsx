import { lazy, Suspense } from 'react';
import Loading from '../../components/loading/Loading';
import { createBrowserRouter } from 'react-router';

const Main = lazy(() => import('../../layout/Main/Main'));
const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage'));
const DashboardLayout = lazy(() =>
    import('../../layout/Dashboard/DashboardLayout')
);
const Dashboard = lazy(() => import('../../pages/Dashboard/Dashboard'));

export const router = createBrowserRouter([
    {
        path: '/',
        element: (
            <Suspense fallback={<Loading />}>
                <Main />
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<Loading />}>
                <ErrorPage />
            </Suspense>
        ),
        children: [
            // { path: "/", element: <Home /> }
        ].map((route) => ({
            ...route,
            element: (
                <Suspense fallback={<Loading />}>{route.element}</Suspense>
            ),
        })),
    },
    {
        path: '/dashboard',
        element: (
            <Suspense fallback={<Loading />}>
                {/* <PrivateRoutes> */}
                <DashboardLayout />
                {/* </PrivateRoutes> */}
            </Suspense>
        ),
        errorElement: (
            <Suspense fallback={<Loading />}>
                <ErrorPage />
            </Suspense>
        ),
        children: [
            { path: '/dashboard', element: <Dashboard /> },
           
        ].map((route) => ({
            ...route,
            element: (
                <Suspense fallback={<Loading />}>{route.element}</Suspense>
            ),
        })),
    },
]);
