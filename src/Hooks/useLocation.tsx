import * as router from 'react-router-dom';
// https://segmentfault.com/q/1010000041418022/a-1020000041418358
export default function useLocation<T>() {
    type L = router.Location & { state: T };

    return router.useLocation() as L;
}
