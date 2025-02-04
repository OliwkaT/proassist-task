import styled from "styled-components";
import { poppins } from "@/layouts/fonts";
import { categories } from "@/constants/categories";
import { X } from "react-feather";

const CategoryFilterWrapper = styled.div`
  display: flex;
  gap: 19px;
  align-items: center;
`;

const CategoryFilterName = styled.div`
  font-family: ${() => poppins.style.fontFamily};
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: #8e2f3f;
  text-transform: uppercase;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-underline-offset: 25%;
  text-decoration-thickness: 20%;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

interface CategoryFilterProps {
  filter: string;
  handleCloseClick: () => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  filter,
  handleCloseClick,
}) => {
  const category = categories.find((cat) => cat.id === filter);

  return (
    <CategoryFilterWrapper>
      <CategoryFilterName>{category?.name}</CategoryFilterName>
      <X size={20} cursor="pointer" onClick={handleCloseClick} />
    </CategoryFilterWrapper>
  );
};
export default CategoryFilter;
