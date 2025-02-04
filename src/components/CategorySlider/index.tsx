import { Category } from "@/types/category";
import { useState } from "react";
import { Circle, ChevronLeft, ChevronRight } from "react-feather";
import styled from "styled-components";
import CategoryTile from "../CategoryTile";
import { PostsQueryParam, ShowParam } from "@/hooks/useHandlePosts";

const SliderWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 35px;
  position: relative;
`;

const DotsWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
`;

const ChevronButton = styled.div<{ side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  ${({ side }) => (side === "left" ? "left: -29px;" : "right: -29px;")}
`;

interface CategorySliderProps {
  categories: Category[];
  filters: string[];
  updateQuery: (key: PostsQueryParam, value: string[] | ShowParam) => void;
}

const CategorySlider: React.FC<CategorySliderProps> = ({
  categories,
  filters,
  updateQuery,
}) => {
  const [counter, setCounter] = useState(0);

  const handleSlideChange = (direction: "prev" | "next"): void => {
    switch (direction) {
      case "next":
        setCounter((prevCounter) =>
          prevCounter >= categories.length - 1 ? 0 : prevCounter + 1
        );
        break;
      case "prev":
        setCounter((prevCounter) =>
          prevCounter <= 0 ? categories.length - 1 : prevCounter - 1
        );
        break;
      default:
        break;
    }
  };

  return (
    <SliderWrapper>
      <DotsWrapper>
        {categories.map(({ id }, i) => (
          <Circle
            key={id}
            fill={i === counter ? "#363B5C" : "none"}
            onClick={() => setCounter(i)}
            size={16}
            color="#363B5C"
            cursor="pointer"
          ></Circle>
        ))}
      </DotsWrapper>
      <ChevronButton side="left" onClick={() => handleSlideChange("prev")}>
        <ChevronLeft size={32} />
      </ChevronButton>
      <ChevronButton side="right" onClick={() => handleSlideChange("next")}>
        <ChevronRight size={32} />
      </ChevronButton>
      {categories.map((cat, index) => {
        const isSelected = filters.includes(cat.id);
        return (
          <CategoryTile
            key={cat.id}
            isVisible={index === counter}
            handleClick={() => {
              const updatedCategories = isSelected
                ? filters.filter((selectedCat) => selectedCat !== cat.id) // Remove if selected
                : [...filters, cat.id]; // Add if not selected

              updateQuery(PostsQueryParam.CATEGORIES, updatedCategories);
            }}
            {...{ ...cat, isSelected }}
          ></CategoryTile>
        );
      })}
    </SliderWrapper>
  );
};
export default CategorySlider;
