import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../Utils/Hooks/useAuth/useAuth";

const PrivateRoute = ({children}) => {
    const {user,loader} = useAuth()
    console.log(user,loader);
    const location = useLocation()
    if(loader){
        console.log('lakjdflkja');
        return <p className="h-screen justify-center items-center loading-spinner"></p>
    }
    if(user){
        console.log("ad");
        return children
    }
    else{
        console.log('lakjdflkja');
        return <Navigate state={location?.pathname} to={"/signIn"}></Navigate>
    }
    
};

export default PrivateRoute;