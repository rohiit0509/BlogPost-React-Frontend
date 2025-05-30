import { AiOutlineLike, AiFillLike } from "react-icons/ai"
import { FaRegComment } from "react-icons/fa"
import { useGet } from "../../hooks/fetchData"
import { BlogSectionWrapper, UserContainer, BlogContainer, BlogImg, BlogReadBtn, UserName, BlogTitle, BlogDescription, BlogContainerLeft, BlogContainerRight, Details, Wrapper, TopicNameContainer, TopicName, RightWrapper, SeeMoreBtn, LikeWrapper, Container, Count, UserChatProfile } from "../../styles/components/BlogSection"
import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Comment from "../Comment"
import { toast } from "react-toastify"

const BlogSection = () => {
  const [like, setLike] = useState()
  const navigate = useNavigate()
  const [openComment, setOpenComment] = useState(false)
  const user = JSON.parse(localStorage.getItem("user") || "null")
  const userToken = localStorage.getItem("authToken")
  const url = process.env.REACT_APP_API_BASE_URL
  const topics = ["Programming", "Data Science", "Technology", "Self Improvement", "Writing", "Machine Learning", "Relationships", "Productivity", "Politics"]

  const { data = [], refetch } = useGet("fetchData", "/getData")
  const [postData, setPostData] = useState({})

  const handleCommentBtn = (postId: string) => {
    setOpenComment((prev) => !prev)
    setPostData({
      postId: postId,
    })
  }

  const handleLikeBtn = async (data: any) => {
    const res = await axios.patch(`${url}/likeonpost/`, data, {
      withCredentials: true,
    })
    setLike(res.data.likesCount)
  }
  useEffect(() => {
    refetch()
  }, [like])

  const triggerError = () => {
    toast.error("Please sign in first!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      theme: "colored",
    })
  }
  return (
    <BlogSectionWrapper>
      {openComment && <Comment refetch={refetch} postData={postData} openComment={setOpenComment} />}
      <BlogContainer>
        <BlogContainerLeft>
          {data &&
            data?.length > 0 &&
            data?.map((item: any, index: number) => {
              return (
                <Wrapper key={index}>
                  <Details>
                    <UserContainer>
                      <UserChatProfile src={item?.userId?.userProfile} />
                      <UserName>{item?.userId?.userName}</UserName>
                    </UserContainer>
                    <BlogTitle fontSize="22px">{item.title}</BlogTitle>
                    <BlogDescription>{item.description}</BlogDescription>
                    <Wrapper justifyContent="space-between">
                      <BlogReadBtn onClick={() => navigate(`/openblog/${item.title}`)}>Read more</BlogReadBtn>
                      <LikeWrapper>
                        <Container>
                          {item?.likes?.includes(user?.id) ? (
                            <AiFillLike
                              size={19}
                              onClick={() => {
                                if (userToken) {
                                  handleLikeBtn({
                                    postId: item._id,
                                    userId: item.userId?._id,
                                    like: false,
                                  })
                                } else {
                                  triggerError()
                                }
                              }}
                            />
                          ) : (
                            <AiOutlineLike
                              size={19}
                              onClick={() => {
                                if (userToken) {
                                  handleLikeBtn({
                                    postId: item._id,
                                    userId: item.userId?._id,
                                    like: true,
                                  })
                                } else {
                                  triggerError()
                                }
                              }}
                            />
                          )}
                          <Count>{item.likes.length}</Count>
                        </Container>
                        <Container
                          onClick={() => {
                            if (userToken) {
                              handleCommentBtn(item._id)
                            } else {
                              triggerError()
                            }
                          }}
                        >
                          <FaRegComment size={19} />
                          <Count>{item.comments.length}</Count>
                        </Container>
                      </LikeWrapper>
                    </Wrapper>
                  </Details>
                  <BlogImg src={item.thumbnail} />
                </Wrapper>
              )
            })}
        </BlogContainerLeft>
        <BlogContainerRight>
          <RightWrapper>
            <BlogTitle fontSize="24px">Discover more of what matters to you</BlogTitle>
            <TopicNameContainer>
              {topics?.map((topic, idx) => (
                <TopicName key={`topic-name-${idx}`}>{topic}</TopicName>
              ))}
            </TopicNameContainer>
            <SeeMoreBtn>See more topics</SeeMoreBtn>
          </RightWrapper>
        </BlogContainerRight>
      </BlogContainer>
    </BlogSectionWrapper>
  )
}

export default BlogSection
