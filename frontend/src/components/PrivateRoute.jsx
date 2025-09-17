import { Navigate } from "react-router-dom";

function PrivateRoute({ usuario, role, children }) {
  if (!usuario) {
    return <Navigate to="/login" />;
  }

  if (role && usuario.tipo !== role) {
    return <Navigate to="/" />;
  }

  return children;
}

export default PrivateRoute;
