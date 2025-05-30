import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useForm } from "react-hook-form";
import { ChatWrapper, ImageContainer, SearchBar } from "../../styles/components/Chat";
import { IconContainer, IconDiv, Profile, ProfileContainer, Name, SendMessageDiv, ViewContainer, LeftMsg, RightMsg } from "../../styles/components/ChattingBox";
import { FcCallback, FcVideoCall, FcLeft, FcAbout } from "react-icons/fc";
import { TbSend } from "react-icons/tb";
  const url = process.env.REACT_APP_API_URL
const ChattingBox = ({ openChat, user }: any) => {
  const { userName, userId, userProfile, loggedInUser } = user;
  const socket = useRef<Socket | null>(null);
  const { register, handleSubmit, reset } = useForm();
  const [chatMessages, setChatMessages] = useState<{ sender: string; text: string }[]>([]);

  const submit = (data: any) => {
    const message = {
      senderId: loggedInUser,
      receiverId: userId,
      text: data.text,
    };

    socket.current?.emit("sendMessage", message); 
    setChatMessages((prev) => [...prev, { sender: loggedInUser, text: data.text }]); 
    reset();
  };

  useEffect(() => {
    socket.current = io(`${url}`);

    socket.current.emit("addUser", loggedInUser);

    socket.current.on("getMessage", (data) => {
      setChatMessages((prev) => [...prev, { sender: data.senderId, text: data.text }]);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [loggedInUser]);

  return (
    <ChatWrapper style={{ padding: "0" }}>
      <IconContainer>
        <FcLeft size={22} cursor={"pointer"} onClick={() => openChat(false)} />
        <IconDiv>
          <FcCallback size={22} cursor={"pointer"} />
          <FcVideoCall size={22} cursor={"pointer"} />
          <FcAbout size={22} cursor={"pointer"} />
        </IconDiv>
      </IconContainer>

      <ProfileContainer>
        <Profile src={userProfile} />
        <Name>{userName}</Name>
      </ProfileContainer>

      <ViewContainer>
        {chatMessages.map((msg, idx) => 
          msg.sender === loggedInUser ? (
            <RightMsg key={idx}>{msg.text}</RightMsg>
          ) : (
            <LeftMsg key={idx}>{msg.text}</LeftMsg>
          )
        )}
      </ViewContainer>

      <SendMessageDiv onSubmit={handleSubmit(submit)}>
        <SearchBar {...register("text")} type="text" placeholder="Message" />
        <ImageContainer>
          <TbSend size={20} cursor={"pointer"} onClick={handleSubmit(submit)} />
        </ImageContainer>
      </SendMessageDiv>
    </ChatWrapper>
  );
};

export default ChattingBox;
