import { Navigate, Outlet, useLocation } from 'react-router';
import { userDataSelector } from '@slices';
import { useSelector } from '../../services/store';

type ProtectedRouteProps = {
  onlyUnAuth?: boolean;
};

const ProtectedRoute = ({ onlyUnAuth = false }: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector(userDataSelector);
  const from = location.state?.from || '/';

  if (!onlyUnAuth && user) {
    return <Navigate to={from} />;
  }

  if (onlyUnAuth && !user) {
    return <Navigate to='/login' state={{ from: location }} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
