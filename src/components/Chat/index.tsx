import { useEffect, useState } from "react"
import { useGet } from "../../hooks/fetchData"
import { CiSearch } from "react-icons/ci"
import ChattingBox from "../ChattingBox"
import { UserContainer, UserName, UserChatProfile } from "../../styles/components/BlogSection"
import { ChatLogo, ChatWrapper, SearchBar, ImageContainer, SearchBarDiv } from "../../styles/components/Chat"
import { DateContainer } from "../../styles/components/Comment"

const Chat = () => {
  const [openChat, setOpenChat] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>({})
  const [conversation, setConversation] = useState<any[]>([])
  const [currentChat, setCurrentChat] = useState<any>(null)

  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null")

  const { data: usersData, refetch: refetchUsers } = useGet("getallusers", "/getallusers")
  const { data: conversationData, refetch: refetchConversations } = useGet("getConversation", `/getConversation/${loggedInUser?.id}`)

  useEffect(() => {
    refetchUsers()
    refetchConversations()
  }, [])

  useEffect(() => {
    if (conversationData) {
      setConversation(conversationData)
    }
  }, [conversationData])

  const handleUserClick = (userId: string, userName: string, userProfile: string) => {
    setOpenChat(true)
    setSelectedUser({ userId, userName, userProfile, loggedInUser: loggedInUser.id })

    const foundChat = conversation.find((c: any) => c.member.includes(userId))
    setCurrentChat(foundChat || null)
  }

  const filteredUsers = usersData?.getAllUser?.filter((user: any) => user._id !== loggedInUser?.id)

  return (
    <>
      <ChatWrapper>
        <ChatLogo>Messages</ChatLogo>
        <SearchBarDiv>
          <ImageContainer>
            <CiSearch />
          </ImageContainer>
          <SearchBar type="text" placeholder="Search" />
        </SearchBarDiv>

        {filteredUsers?.length === 0 ? (
          <DateContainer style={{ display: "flex", justifyContent: "center" }}>No one online to chat</DateContainer>
        ) : (
          filteredUsers?.map((userItem: any, index: number) => {
            return (
              <UserContainer
                key={index}
                onClick={() => handleUserClick(userItem._id, userItem.userName, userItem.userProfile)}
                style={{
                  padding: "20px 0 0 18px",
                  gap: "8px",
                  cursor: "pointer",
                }}
              >
                <UserChatProfile src={userItem?.userProfile} />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <UserName>{userItem.userName}</UserName>
                  <DateContainer>Online</DateContainer>
                </div>
              </UserContainer>
            )
          })
        )}
      </ChatWrapper>

      {openChat && <ChattingBox user={selectedUser} openChat={setOpenChat} conversation={currentChat} />}
    </>
  )
}

export default Chat
