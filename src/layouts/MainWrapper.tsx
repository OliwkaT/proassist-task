import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  margin: 0 auto;
  padding: 0 29px;
  width: 100%;
  max-width: 1631px;
  box-sizing: border-box;
`;

const MainWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <Wrapper>{children}</Wrapper>;
};

export default MainWrapper;
