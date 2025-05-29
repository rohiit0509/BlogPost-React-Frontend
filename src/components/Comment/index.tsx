import { useForm } from "react-hook-form"
import { CommentWrapper, CommentTitle, CommentContainer, CommentTitleDiv, CommentInput, CommentForm, Msg, CommentContainerWrapper, DateContainer } from "../../styles/components/Comment"
import { GrFormClose } from "react-icons/gr"
import { useGet, usePost } from "../../hooks/fetchData"
import { UserName, UserChatProfile, UserCommentContainer } from "../../styles/components/BlogSection"
import { useEffect } from "react"
import dayjs from "dayjs"

const Comment = ({ postData, openComment, refetch: refetchComments }: any) => {
  const { register, handleSubmit } = useForm()

  const { data: commentedData, mutate } = usePost(`/commentonpost/${postData.postId}`)

  const submit = (data: any) => {
    mutate(data)
  }

  const { data, refetch } = useGet("showcomnts", `/showcomments/${postData.postId}`)

  useEffect(() => {
    refetch()
    refetchComments()
  }, [commentedData])

  return (
    <CommentWrapper>
      <CommentTitleDiv>
        <CommentTitle>Responses</CommentTitle>
        <GrFormClose size={25} cursor={"pointer"} onClick={() => openComment(false)} />
      </CommentTitleDiv>
      <CommentForm onSubmit={handleSubmit(submit)}>
        <CommentInput {...register("comment")} type="text" placeholder="What's your thoughts?" />
      </CommentForm>
      {data?.map((item: any, index: number) => {
        const formattedDate = dayjs(item.createdAt).format("DD MMM YYYY, hh:mm A")

        return (
          <CommentContainerWrapper key={index}>
            <CommentContainer>
              <UserCommentContainer style={{ gap: "5px" }}>
                <UserChatProfile src={item?.userProfile} />
                <div style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <UserName>{item.userName}</UserName>
                  <DateContainer>{formattedDate}</DateContainer>
                </div>
              </UserCommentContainer>
              <Msg>{item.msg}</Msg>
            </CommentContainer>
          </CommentContainerWrapper>
        )
      })}
    </CommentWrapper>
  )
}

export default Comment
