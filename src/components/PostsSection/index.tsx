import Post from "@/components/Post";
import { openSans } from "@/layouts/fonts";
import { Post as IPost } from "@/types/post";
import Grid from "@mui/material/Grid2";
import { useRouter } from "next/router";
import { Frown, AlertTriangle, FileText } from "react-feather";
import styled from "styled-components";

interface PostsSectionProps {
  posts: IPost[];
  isLoading: boolean;
  error: string | null;
}

const MessageWrapper = styled.div`
  width: 100%;
  font-family: ${() => openSans.style.fontFamily};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 12px;
  padding: 60px 0;
  color: #8e2f3f;
  font-size: 18px;
  font-weight: 600;
`;

const PostsSection: React.FC<PostsSectionProps> = ({
  posts,
  isLoading,
  error,
}) => {
  const { push } = useRouter();

  if (isLoading)
    return (
      <MessageWrapper>
        <Frown size={48} />
        <span>Loading posts...</span>
      </MessageWrapper>
    );

  if (error)
    return (
      <MessageWrapper>
        <AlertTriangle size={48} />
        <span>Something went wrong: {error}</span>
      </MessageWrapper>
    );

  if (!posts.length)
    return (
      <MessageWrapper>
        <FileText size={48} />
        <span>No posts available</span>
      </MessageWrapper>
    );

  return (
    <Grid container columnSpacing="56px" pt="60px">
      {posts.map((post) => (
        <Grid key={post.id} size={{ xs: 12, md: 6, lg: 3 }}>
          <Post handleSeeMoreClick={(id) => push(`/post/${id}`)} {...post} />
        </Grid>
      ))}
    </Grid>
  );
};

export default PostsSection;
