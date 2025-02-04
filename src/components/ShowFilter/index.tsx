import styled from "styled-components";
import { poppins } from "@/layouts/fonts";
import { ShowFilter as IShowFilter } from "@/types/showFilters";

const FilterWrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  cursor: pointer;
`;

const FilterName = styled.div<{ isselected: boolean }>`
  font-family: ${() => poppins.style.fontFamily};
  font-weight: ${({ isselected }) => (isselected ? 700 : 500)};
  font-size: 14px;
  line-height: 21px;
  color: ${({ isselected }) => (isselected ? "#8e2f3f" : "#1F1A17")};
  text-transform: uppercase;
  text-decoration-line: ${({ isselected }) =>
    isselected ? "underline" : "none"};
  text-decoration-style: solid;
  text-underline-offset: 25%;
  text-decoration-thickness: 20%;
  text-underline-position: from-font;
  text-decoration-skip-ink: none;
`;

const Separator = styled.div`
  width: 13px;
  height: 2px;
  transform: rotate(-52deg);
  background-color: #a02e41;
`;

interface ShowFilterProps {
  filter: IShowFilter;
  isSelected: boolean;
  isFirst: boolean;
  handleClick: () => void;
}

const ShowFilter: React.FC<ShowFilterProps> = ({
  filter,
  handleClick,
  isSelected,
  isFirst,
}) => {
  return (
    <FilterWrapper onClick={handleClick}>
      {!isFirst && <Separator />}
      <FilterName isselected={isSelected}>{filter.name}</FilterName>
    </FilterWrapper>
  );
};
export default ShowFilter;
