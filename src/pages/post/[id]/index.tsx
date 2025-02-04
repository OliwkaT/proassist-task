import useScreenSize from "@/hooks/useScreenSize";
import { openSans, playfairDisplay, poppins } from "@/layouts/fonts";
import MainWrapper from "@/layouts/MainWrapper";
import Grid from "@mui/material/Grid2";
import styled from "styled-components";
import { ArrowLeft, Star } from "react-feather";
import { useRouter } from "next/router";
import Image from "next/image";
import { useHandlePost } from "@/hooks/useHandlePost";
import { useFavorites } from "@/contexts/Favorites/useFavorites";

const Title = styled.div`
  font-family: ${() => openSans.style.fontFamily};
  font-weight: 700;
  color: #363b5c;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 68px;
`;

const PageUpperTextWrapper = styled(Title)`
  font-size: 12px;
  line-height: 16.4px;
  text-transform: uppercase;
  padding-bottom: 21px;
  border-bottom: 1px solid #dddddd;
  width: 100%;
`;

const PageTitle = styled(Title)`
  font-size: 32px;
  line-height: 43.6px;
`;

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 61px 0 54px;

  @media (max-width: 900px) {
    flex-direction: column;
    padding: 0 0 8px;
    gap: 40px;
    align-items: flex-start;
  }
`;

const HeaderItemsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const AddToFavText = styled(Title)`
  font-size: 18px;
  line-height: 24.5px;
`;

const PostTitle = styled.div`
  font-family: ${() => playfairDisplay.style.fontFamily};
  font-weight: 700;
  color: #363b5c;
  font-size: 35px;
  line-height: 46.7px;
  padding-top: 124px;

  @media (max-width: 900px) {
    padding-top: 32pxpx;
  }
`;

const PostBody = styled(Title)`
  font-weight: 400;
  font-size: 16px;
  line-height: 25px;
  padding-top: 24px;
`;

const PostSubTitle = styled(Title)`
  font-size: 28px;
  line-height: 38px;
  padding-top: 82px;

  @media (max-width: 900px) {
    padding-top: 24pxpx;
  }
`;

const PostSubBody = styled.div`
  font-family: ${() => poppins.style.fontFamily};
  font-weight: 400;
  font-size: 18px;
  line-height: 36px;
  padding-top: 32px;
  padding-bottom: 70px;
`;

const ImageWrapper = styled.div`
  width: 100%;
  height: 680px;
  position: relative;
  overflow: hidden;
  border-top-left-radius: 60px;
  border-bottom-right-radius: 60px;
`;

const PostDetails: React.FC = () => {
  const { push } = useRouter();
  const { isMobile } = useScreenSize();
  const { post, isLoading, error } = useHandlePost();
  const { checkIfFavorite, toggleFavorite } = useFavorites();

  if (isLoading) {
    return (
      <MainWrapper>
        <BodyWrapper>
          <PageTitle>Loading...</PageTitle>
        </BodyWrapper>
      </MainWrapper>
    );
  }

  if (error) {
    return (
      <MainWrapper>
        <BodyWrapper>
          <PageTitle>Error loading post. Please try again.</PageTitle>
        </BodyWrapper>
      </MainWrapper>
    );
  }

  if (!post) {
    return (
      <MainWrapper>
        <BodyWrapper>
          <PageTitle>Post not found</PageTitle>
        </BodyWrapper>
      </MainWrapper>
    );
  }

  const isFav = checkIfFavorite(post.id);

  return (
    <>
      <MainWrapper>
        <BodyWrapper>
          {!isMobile && <PageUpperTextWrapper>- blog</PageUpperTextWrapper>}
          <Grid container>
            <Grid size={{ xs: 12, lg: 10 }}>
              <HeaderWrapper>
                <HeaderItemsWrapper>
                  <ArrowLeft
                    color="#363b5c"
                    cursor="pointer"
                    onClick={() => push("/")}
                  />
                  <PageTitle>Blog Edukacyjny</PageTitle>
                </HeaderItemsWrapper>
                <HeaderItemsWrapper>
                  <Star
                    color="#1E1E1E"
                    cursor="pointer"
                    fill={isFav ? "#1E1E1E" : "none"}
                    onClick={() => toggleFavorite(post.id)}
                  />
                  <AddToFavText>dodaj do ulubionych</AddToFavText>
                </HeaderItemsWrapper>
              </HeaderWrapper>
              <PostTitle>{post.title}</PostTitle>
              <PostBody>{post.body}</PostBody>
              <PostSubTitle>Lorem ipsum</PostSubTitle>
              <PostSubBody>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In quis
                neque at turpis blandit viverra sed eget augue. Suspendisse
                potenti. Pellentesque habitant morbi tristique senectus et netus
                et malesuada fames ac turpis egestas. Sed at orci sit amet nulla
                scelerisque porttitor et non libero. Vestibulum a molestie
                ligula. Curabitur dignissim sem leo, eget venenatis erat
                vulputate eu. Vestibulum sapien mi, fringilla ac lorem vitae,
                pulvinar tempus dui. Vivamus id euismod tellus. Cras pulvinar
                tortor at augue suscipit vehicula. In iaculis dapibus diam at
                egestas. Nunc urna nibh, porta nec fringilla sit amet, pretium
                eu ante. Vivamus nec pulvinar ipsum, et euismod purus. Vivamus
                tristique nunc eros, dapibus aliquet lectus euismod tristique.
                Nunc viverra felis eget ante aliquam, vel gravida nunc tempus.
                Nam iaculis ac urna a aliquet.
              </PostSubBody>
              <ImageWrapper>
                <Image
                  src="/images/postImage.png"
                  fill
                  alt="Post image"
                  style={{ objectFit: "cover" }}
                />
              </ImageWrapper>
            </Grid>
          </Grid>
        </BodyWrapper>
      </MainWrapper>
    </>
  );
};
export default PostDetails;
