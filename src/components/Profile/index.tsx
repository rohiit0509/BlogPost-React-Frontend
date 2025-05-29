import { RiLogoutBoxRFill } from "react-icons/ri"
import { ProfileWrapper, LogoutContainer } from "../../styles/components/Profile"
import { UserContainer, UserProfile, UserName } from "../../styles/components/BlogSection"
import { useNavigate } from "react-router-dom"

const Profile = () => {
  const navigate = useNavigate()
  const user = JSON.parse(localStorage.getItem("user") || "null")

  function handleLogout() {
    const cookies = document.cookie.split(";")
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i]
      const eqPos = cookie.indexOf("=")
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }

    localStorage.removeItem("user")
    localStorage.removeItem("authToken")
    navigate("/")
  }

  return (
    <ProfileWrapper>
      <UserContainer style={{ gap: "10px" }}>
        <UserProfile src={user?.userProfile || "/default.jpg"} />
        <div>
          <UserName>{user?.userName || "Guest"}</UserName>
          <p style={{ fontSize: "12px", color: "#888",  margin:"0" }}>{user?.email || ""}</p>
        </div>
      </UserContainer>

      {user && (
        <LogoutContainer onClick={handleLogout}>
          <RiLogoutBoxRFill />
          <UserName>Logout</UserName>
        </LogoutContainer>
      )}
    </ProfileWrapper>
  )
}

export default Profile
