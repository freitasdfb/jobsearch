import styled from "styled-components";

const Container = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export function ContainerGlobal(props) {
  return <Container>{props.children}</Container>;
}
