import Image from "next/image";
import styled from "styled-components";
import useScreenSize from "@/hooks/useScreenSize";
import { poppins } from "../fonts";
import MainWrapper from "../MainWrapper";

const HeaderWrapper = styled.div`
  display: flex;
  gap: 24px;
  align-items: center;
  width: 100%;
  margin-top: 63px;
`;

const Column = styled.div`
  display: flex;
  flex-direction: column;
`;

const LogoUpperText = styled.div`
  font-family: ${() => poppins.style.fontFamily};
  font-weight: 600;
  font-style: italic;
  font-size: 32px;
  line-height: 32px;
  span {
    color: #8e2f3f;
  }
`;

const LogoLowerText = styled.div`
  font-family: ${() => poppins.style.fontFamily};
  font-weight: 300;
  font-style: italic;
  font-size: 22px;
  line-height: 22px;
`;

const InstituteNameWrapper = styled(Column)`
  font-family: ${() => poppins.style.fontFamily};
  font-weight: 400;
  font-size: 15px;
  line-height: 16.8px;
  white-space: pre-line;
  text-transform: uppercase;
  color: #777776;
  border-left: 1px solid #777776;
  padding-left: 24px;
`;

const Header: React.FC = () => {
  const { isMobile } = useScreenSize();

  return (
    <MainWrapper>
      <HeaderWrapper>
        <Image
          src="/images/logo.png"
          alt="FIE logomark"
          width={57}
          height={55}
        />
        <Column>
          <LogoUpperText>
            <span>A</span>CME
          </LogoUpperText>
          <LogoLowerText>Institute</LogoLowerText>
        </Column>
        {!isMobile && (
          <InstituteNameWrapper>{`fikcyjna\ninstytucja\nedukacyjna`}</InstituteNameWrapper>
        )}
      </HeaderWrapper>
    </MainWrapper>
  );
};
export default Header;
