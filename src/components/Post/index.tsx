import styled from "styled-components";
import { openSans, playfairDisplay } from "@/layouts/fonts";
import { Post as IPost } from "@/types/post";
import { categories } from "@/constants/categories";
import { ArrowRight } from "react-feather";

const PostBodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  border-top-left-radius: 53px;
  border-bottom-right-radius: 53px;
  padding: 48px 34px 56px 36px;
  margin-bottom: 56px;
`;

const CategoryText = styled.div<{ color?: string }>`
  font-family: ${() => openSans.style.fontFamily};
  font-weight: 600;
  font-size: 14px;
  line-height: 26.5px;
  color: ${({ color }) => color};
  font-style: italic;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-underline-offset: 25%;
  text-decoration-thickness: 20%;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
  margin-bottom: 10px;
  text-transform: uppercase;
`;

const PostTitle = styled.div`
  font-family: ${() => playfairDisplay.style.fontFamily};
  font-weight: 900;
  font-size: 24.8px;
  line-height: 31px;
  letter-spacing: 0.04em;
  margin-bottom: 36px;
  color: #1e2c3b;
  display: -webkit-box;
  -webkit-line-clamp: 3; /* Limit to 3 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  min-height: 186px;
`;

const DateText = styled.div`
  font-family: ${() => playfairDisplay.style.fontFamily};
  font-weight: 700;
  font-size: 19.5px;
  line-height: 28px;
  margin-bottom: 36px;
  color: #1e2c3b;
`;

const BodyText = styled.div`
  font-family: ${() => openSans.style.fontFamily};
  font-weight: 400;
  font-size: 16px;
  line-height: 25.5px;
  margin-bottom: 36px;
  color: #1e2c3b;
  display: -webkit-box;
  -webkit-line-clamp: 7; /* Limit to 7 lines */
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
`;

const SeeMoreWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  cursor: pointer;
`;

const SeeMoreText = styled.div`
  font-family: ${() => openSans.style.fontFamily};
  font-weight: 700;
  font-size: 16px;
  line-height: 21.7px;
  color: #1e2c3b;
`;

interface PostProps extends IPost {
  handleSeeMoreClick: (id: number) => void;
}

const formatDate = (date: Date | string): string => {
  const d = new Date(date);
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0"); // Months are 0-based
  const year = d.getFullYear();
  return `${day}.${month}.${year}`;
};

const Post: React.FC<PostProps> = ({
  categoryId,
  title,
  body,
  createdAt,
  id,
  handleSeeMoreClick,
}) => {
  const category = categories.find((cat) => cat.id === categoryId);
  return (
    <PostBodyWrapper>
      <CategoryText color={category?.tileColor}>{category?.name}</CategoryText>
      <PostTitle>{title}</PostTitle>
      <DateText>{formatDate(createdAt)}</DateText>
      <BodyText>{body}</BodyText>
      <SeeMoreWrapper onClick={() => handleSeeMoreClick(id)}>
        <SeeMoreText>zobacz więcej</SeeMoreText>
        <ArrowRight color="#1e2c3b" />
      </SeeMoreWrapper>
    </PostBodyWrapper>
  );
};
export default Post;
