import { ToastContainer, Zoom, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LeftDiv, RightDiv, Input, LoginContainer, LoginWrapper, InputBtn, Image, TitleContainer, Title, TitlePara, A, LoginFooter, Form } from "../../styles/components/Login"
import LoginDp from "../../assets/svg/login-dp.svg"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useState } from "react"
import Loader from "../Loader"
import { IoArrowBackCircle } from "react-icons/io5";
const url = process.env.REACT_APP_API_URL

const Login = () => {
  const [loader, setLoader] = useState(false)
  const { register, handleSubmit } = useForm()

  const onSubmit = async (data: any) => {
    setLoader(true)
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    }

    try {
      const res = await axios.post(`${url}/login`, data, config)

      if (res.status === 200) {
        const { token, user } = res.data

        localStorage.setItem("authToken", token)
        localStorage.setItem("user", JSON.stringify(user))
        toast.success(res.data.msg, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          theme: "colored",
          style: { background: "green" },
        })

        navigate("/")
        setTimeout(() => {
        }, 1000)
      }
    } catch (error: any) {
      const msg = error.response?.data?.msg || "Something went wrong"
      toast.error(msg, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        theme: "colored",
        transition: Zoom,
      })
    } finally {
      setLoader(false)
    }
  }

  const navigate = useNavigate()
  return (
    <LoginWrapper>
      <LoginContainer>
        <ToastContainer />
        <LeftDiv>
          <Image src={LoginDp}></Image>
        </LeftDiv>
        <RightDiv>
          <TitleContainer>
            <IoArrowBackCircle size={30} cursor={'pointer'} onClick={()=>navigate('/')}/>
            <Title>Login</Title>
            <TitlePara>Please Sign in to continue.</TitlePara>
          </TitleContainer>
          <Form height="35%" gap="20px" onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("email")} type="email" placeholder="Email" />
            <Input {...register("password")} type="password" placeholder="Password" />
            <InputBtn BackgroundColor="#fb684e" disabled={loader}>
              {loader && <Loader />}Login
            </InputBtn>
          </Form>
          <LoginFooter marginTop="0">
            <TitlePara>
              Don't have an account?{" "}
              <A
                onClick={() => {
                  navigate("/signup")
                }}
              >
                Sign up
              </A>
            </TitlePara>
          </LoginFooter>
        </RightDiv>
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Login
