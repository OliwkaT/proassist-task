import styled from "styled-components";
import Header from "./Header";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  background-color: white;
`;

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Wrapper>
      <Header />
      {children}
    </Wrapper>
  );
};
export default AppLayout;
