import { User } from "@/models/User.model";
import { routes } from "@/routes";
import { Navigate, Outlet } from "react-router";

function PrivateRoute() {
  const isAuth: User = JSON.parse(localStorage.getItem("user") || "{}");
  return isAuth.id ? <Outlet /> : <Navigate to={routes.login} />;
}
export default PrivateRoute;
