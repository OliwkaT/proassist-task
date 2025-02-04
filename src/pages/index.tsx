import CategoryFilter from "@/components/CategoryFilter";
import CategorySlider from "@/components/CategorySlider";
import CategoryTile from "@/components/CategoryTile";
import PostsSection from "@/components/PostsSection";
import ShowFilter from "@/components/ShowFilter";
import { categories } from "@/constants/categories";
import { showFilters } from "@/constants/filters";
import { PostsQueryParam, useHandlePosts } from "@/hooks/useHandlePosts";
import useScreenSize from "@/hooks/useScreenSize";
import { openSans } from "@/layouts/fonts";
import MainWrapper from "@/layouts/MainWrapper";
import Grid from "@mui/material/Grid2";
import styled from "styled-components";

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

const PageTitleWrapper = styled(Title)`
  font-size: 32px;
  line-height: 43.6px;
  padding: 61px 0 54px;

  @media (max-width: 600px) {
    padding: 0 0 8px;
  }
`;

const CategorySectionWrapper = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  padding: 55px 0 122px;

  @media (max-width: 600px) {
    padding: 37px 0 114px;
  }
`;

const SectionTitle = styled(Title)`
  font-size: 24px;
  line-height: 32.7px;
`;

const CategoryContentWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 50px;
`;

const FiltersHeaderWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const PostsSectionWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 36px;
  align-items: center;
`;

const SortText = styled.div`
  font-family: ${() => openSans.style.fontFamily};
  font-weight: 400;
  line-height: 16.3px;
  color: #363b5c;
  white-space: nowrap;
`;

const SortRow = styled.div`
  display: flex;
  align-items: center;
  gap: 44px;
  width: 100%;
`;

const SortSelectedText = styled(Title)`
  font-size: 12px;
  line-height: 16.3px;
  border-bottom: 1px solid #e5e5e5;
  padding-bottom: 7px;
  width: 100%;
`;

const ShowFiltersWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 45px;
`;

const Home: React.FC = () => {
  const { isTablet, isMobile } = useScreenSize();
  const { filters, updateQuery, posts, error, isLoading } = useHandlePosts();

  return (
    <>
      <MainWrapper>
        <BodyWrapper>
          {!isMobile && <PageUpperTextWrapper>- blog</PageUpperTextWrapper>}
          <PageTitleWrapper>Blog Edukacyjny</PageTitleWrapper>
        </BodyWrapper>
      </MainWrapper>
      <CategorySectionWrapper>
        <MainWrapper>
          <CategoryContentWrapper>
            {isTablet ? (
              <CategorySlider
                filters={filters[PostsQueryParam.CATEGORIES]}
                {...{ categories, updateQuery }}
              />
            ) : (
              <>
                <SectionTitle>Kategorie</SectionTitle>
                <Grid container spacing="56px">
                  {categories.map((cat) => {
                    const isSelected = filters[
                      PostsQueryParam.CATEGORIES
                    ].includes(cat.id);
                    return (
                      <Grid key={cat.id} size={{ xs: 12, md: 6, lg: 3 }}>
                        <CategoryTile
                          handleClick={() => {
                            const updatedCategories = isSelected
                              ? filters[PostsQueryParam.CATEGORIES].filter(
                                  (selectedCat) => selectedCat !== cat.id
                                ) // Remove if selected
                              : [
                                  ...filters[PostsQueryParam.CATEGORIES],
                                  cat.id,
                                ]; // Add if not selected

                            updateQuery(
                              PostsQueryParam.CATEGORIES,
                              updatedCategories
                            );
                          }}
                          {...{ ...cat, isSelected }}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </>
            )}
          </CategoryContentWrapper>
        </MainWrapper>
      </CategorySectionWrapper>
      <MainWrapper>
        <FiltersHeaderWrapper>
          <Grid container>
            <Grid
              size={{ xs: 6, md: 12 }}
              order={1}
              pt={{ xs: "64px", md: "82px" }}
            >
              <PostsSectionWrapper>
                <SectionTitle>Wpisy</SectionTitle>
                {filters[PostsQueryParam.CATEGORIES].length > 0 &&
                  !isTablet && (
                    <>
                      {filters[PostsQueryParam.CATEGORIES].map((filter) => (
                        <CategoryFilter
                          key={filter}
                          handleCloseClick={() => {
                            updateQuery(
                              PostsQueryParam.CATEGORIES,
                              filters[PostsQueryParam.CATEGORIES].filter(
                                (selectedCat) => selectedCat !== filter
                              )
                            );
                          }}
                          {...{ filter }}
                        />
                      ))}
                    </>
                  )}
              </PostsSectionWrapper>
            </Grid>
            <Grid
              size={{ xs: 12, md: 8 }}
              order={{ xs: 3, md: 2 }}
              display="flex"
              justifyContent={{ xs: "flex-start", md: "flex-end" }}
              paddingRight={{ xs: 0, md: "116px" }}
              pt={{ xs: "60px", md: 0 }}
            >
              <ShowFiltersWrapper>
                {showFilters.map((filter) => (
                  <ShowFilter
                    key={filter.id}
                    isSelected={filters[PostsQueryParam.SHOW] === filter.value}
                    isFirst={filter.id === 1}
                    handleClick={() =>
                      updateQuery(PostsQueryParam.SHOW, filter.value)
                    }
                    {...{ filter }}
                  />
                ))}
              </ShowFiltersWrapper>
            </Grid>
            <Grid
              size={{ xs: 6, md: 4 }}
              order={{ xs: 2, md: 3 }}
              display={{ xs: "flex" }}
              justifyContent={{ xs: "flex-end" }}
              pt={{ xs: "64px", md: 0 }}
            >
              {/* Mock select */}
              <SortRow>
                {!isTablet && <SortText>pokaż od:</SortText>}
                <SortSelectedText>Najnowsze wpisy</SortSelectedText>
              </SortRow>
            </Grid>
          </Grid>
        </FiltersHeaderWrapper>
        <PostsSection {...{ posts, isLoading, error }} />
      </MainWrapper>
    </>
  );
};
export default Home;
