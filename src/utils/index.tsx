import axios from "axios"
const url = process.env.REACT_APP_API_URL

export const IsLogin =async()=>{
     try{
      let res = await axios.get(`${url}/auth`,{withCredentials:true})
      if(res.status===200){
        return true
      }else
    return false
     }
     catch(err:any){
        return false
     }
      
}
