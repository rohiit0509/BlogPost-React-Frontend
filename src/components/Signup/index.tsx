import { ToastContainer, Zoom, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { LeftDiv, Input, LoginContainer, Form, LoginWrapper, RightDiv, Image, TitleContainer, Title, TitlePara, InputBtn, LoginFooter, A } from "../../styles/components/Login"
import SignupImg from "../../assets/images/signup-dp.webp"
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import Loader from "../Loader"
import { useState } from "react"
import { IoArrowBackCircle } from "react-icons/io5"
const url = process.env.REACT_APP_API_BASE_URL

const Signup = () => {
  const navigate = useNavigate()
  const [btnLoading, setBtnLoading] = useState(false)
  const { register, handleSubmit } = useForm()
  const onSubmit = async (data: any) => {
    setBtnLoading(true)
    try {
      const res = await axios.post(`${url}/signup`, data)
      const toastConfig = {
        position: "top-right" as const,
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored" as const,
      }

      if (res.status === 200 || res.status === 201) {
        toast.success(res.data.msg, {
          ...toastConfig,
          style: { background: "#84a5e9" },
        })
        setTimeout(() => {
          navigate("/login")
        }, 1000)
      } else if (res.status === 203) {
        toast.error(res.data.msg, {
          ...toastConfig,
          transition: Zoom,
        })
      }
    } catch (err: any) {
      toast.error(err?.response?.data?.msg || "Signup failed", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      })
    } finally {
      setBtnLoading(false)
    }
  }
  return (
    <LoginWrapper>
      <LoginContainer>
        <ToastContainer />
        <LeftDiv>
          <Image src={SignupImg} style={{ width: "550px" }}></Image>
        </LeftDiv>
        <RightDiv>
          <TitleContainer>
            <IoArrowBackCircle size={30} cursor={"pointer"} onClick={() => navigate("/")} />

            <Title>Sign up</Title>
            <TitlePara>Create your account.</TitlePara>
          </TitleContainer>
          <Form height="50%" gap="40px" onSubmit={handleSubmit(onSubmit)}>
            <Input {...register("email")} type="email" placeholder="Email" />
            <Input {...register("userName")} type="text" placeholder="Username" />
            <Input {...register("password")} type="password" placeholder="Password" />
            <Input {...register("phone")} type="tel" placeholder="Phone" />
            <InputBtn BackgroundColor="#aca1ff" disabled={btnLoading}>
              {btnLoading && <Loader />}Sign up
            </InputBtn>
          </Form>
          <LoginFooter marginTop="0">
            <TitlePara>
              Do you have an account?{" "}
              <A
                onClick={() => {
                  navigate("/login")
                }}
              >
                Log in
              </A>
            </TitlePara>
          </LoginFooter>
        </RightDiv>
      </LoginContainer>
    </LoginWrapper>
  )
}

export default Signup
