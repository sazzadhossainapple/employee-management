import { lazy, Suspense } from 'react';
import Loading from '../../components/loading/Loading';
import { createBrowserRouter } from 'react-router';

const ErrorPage = lazy(() => import('../../pages/ErrorPage/ErrorPage'));
const DashboardLayout = lazy(() =>
    import('../../layout/Dashboard/DashboardLayout')
);
const Dashboard = lazy(() => import('../../pages/Dashboard/Dashboard'));
const Employee = lazy(() => import('../../pages/Employee/Employee'));
const EmployeeCardList = lazy(() =>
    import('../../pages/EmployeeList/EmployeeCardList')
);

export const router = createBrowserRouter([
    {
        path: '/',
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
            { path: '/', element: <Dashboard /> },
            { path: '/employee', element: <Employee /> },
            { path: '/employee/card', element: <EmployeeCardList /> },
        ].map((route) => ({
            ...route,
            element: (
                <Suspense fallback={<Loading />}>{route.element}</Suspense>
            ),
        })),
    },
]);
