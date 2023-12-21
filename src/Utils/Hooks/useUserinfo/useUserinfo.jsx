import { useQuery } from '@tanstack/react-query';
import useAxios from '../axios/useaxios';
import useAuth from '../useAuth/useAuth';

const useUserinfo = () => {
    const {user} = useAuth()
    const axios = useAxios()
    const {data:userinfo=[],isLoading,isError} = useQuery({
        queryKey:['userinfo'],
        queryFn:async()=>{
            const res = await axios.get(`/getUserinfo?email=${user.email}`)
            return res.data;
        }
    })
    return {userinfo,isLoading,isError}
};

export default useUserinfo;