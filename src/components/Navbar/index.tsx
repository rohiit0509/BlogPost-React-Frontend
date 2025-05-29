import { useNavigate } from "react-router-dom"
import { Div, NavBtn, NavLogo, NavbarWrapper, HiddenNav } from "../../styles/components/Navbar"
import { useEffect, useState } from "react"
import { SiMessenger } from "react-icons/si"
import Chat from "../Chat"
import { FaUserCircle } from "react-icons/fa"

import Profile from "../Profile"

const Navbar = () => {
  const [top, setTop] = useState(-80)
  const [fontColor, setColor] = useState("#ffffff")
  const [background, setBackground] = useState("")
  const [openProfile, setOpenProfile] = useState(false)
  const [openChat, setOpenChat] = useState(false)
  const user = localStorage.getItem("user")

  useEffect(() => {
    window.onscroll = () => {
      if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        setTop(0)
        setColor("#ff8000")
        setBackground("#ff8000")
      } else {
        setTop(-80)
        setColor("#ffffff")
        setBackground("")
      }
    }
  }, [top])
  const navigate = useNavigate()
  return (
    <>
      <HiddenNav id="HiddenNav" style={{ top: top }} />
      <NavbarWrapper>
        <NavLogo style={{ color: fontColor }}>Blogpost</NavLogo>
        <Div>
          {!user && (
            <>
              <NavBtn onClick={() => navigate("/signup")} style={{ background: background }}>
                Sign up
              </NavBtn>
              <NavBtn onClick={() => navigate("/login")} style={{ background: background }}>
                Login
              </NavBtn>
            </>
          )}
          {user && (
            <>
              <SiMessenger
                color={top === 0 ? "#455a64" : "#ffffff"}
                size={27}
                cursor={"pointer"}
                onClick={() => {
                  setOpenChat((prev) => !prev)
                  setOpenProfile(false)
                }}
              />
              <FaUserCircle
                cursor={"pointer"}
                color={top === 0 ? "#455a64" : "#ffffff"}
                size={30}
                onClick={() => {
                  setOpenProfile((prev) => !prev)
                  setOpenChat(false)
                }}
              />
              {openProfile && <Profile />}
            </>
          )}
        </Div>
      </NavbarWrapper>
      {openChat && <Chat />}
    </>
  )
}

export default Navbar
