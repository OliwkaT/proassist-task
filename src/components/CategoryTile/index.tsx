import { Category } from "@/types/category";
import styled from "styled-components";
import Image from "next/image";
import { openSans } from "@/layouts/fonts";

const TileCard = styled.div<{
  tilecolor: string;
  isvisible?: boolean;
  isselected?: boolean;
}>`
  width: 100%;
  background-color: ${({ tilecolor }) => tilecolor};
  flex-direction: column;
  display: ${({ isvisible }) => (isvisible ? "flex" : "none")};
  overflow: hidden;
  border-top-left-radius: 60px;
  border-bottom-right-radius: 60px;
  cursor: pointer;

  // Selected state
  border: ${({ isselected }) => (isselected ? "6px solid #A02E41" : "none")};
  box-shadow: ${({ isselected }) =>
    isselected ? "0px 0px 15px 0px #0000004d" : "none"};
`;

const TileBg = styled.div`
  width: 100%;
  position: relative;
  aspect-ratio: 369 / 229;
`;

const TileContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 23px;
  padding: 44px 0 71px;
`;

const Title = styled.div<{ usewhitetext?: boolean }>`
  font-family: ${() => openSans.style.fontFamily};
  font-weight: 700;
  color: ${({ usewhitetext }) => (usewhitetext ? "white" : "#363b5c")};
  font-size: 20px;
  line-height: 27.2px;
  text-transform: uppercase;
`;

interface CategoryTileProps extends Category {
  handleClick: () => void;
  isVisible?: boolean; // Determinate visibility in slider component
  isSelected?: boolean; // Determinate border state
}

const CategoryTile: React.FC<CategoryTileProps> = ({
  name,
  bgImagePath,
  icon: Icon,
  tileColor,
  useWhiteText,
  handleClick,
  isVisible = true,
  isSelected = false,
}) => {
  return (
    <TileCard
      tilecolor={tileColor}
      isvisible={isVisible}
      isselected={isSelected}
      onClick={handleClick}
    >
      <TileBg>
        <Image src={bgImagePath} fill alt={name} />
      </TileBg>
      <TileContentWrapper>
        <Title usewhitetext={useWhiteText}>{name}</Title>
        <Icon />
      </TileContentWrapper>
    </TileCard>
  );
};

export default CategoryTile;
