import styled from "styled-components";


const CardHomeContainer = styled.div`
  display: flex;
  align-items: center;
`;

const CardBody = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  `

const CardText = styled.div`
  display: flex;
  justify-content: space-between;
`

export default function CardHome(props) {
  return (
    <CardHomeContainer className="card">
      <CardBody className="card-body container">
        <CardText className="card-text row">
            {props.children}
        </CardText>
      </CardBody>
    </CardHomeContainer>
  );
}
