import styled from "styled-components";
import { colors } from "../constants/colors";

export default function HistoryPage(){
  return(
    <Container>
      <Date>Histórico</Date>
      <Sub>Em breve você poderá ver o histórico dos seus hábitos aqui!</Sub>
    </Container>
  )
}
const Container = styled.div`
  min-height: 100vh;
  height: 100%;
  width: 100%;
  background-color: #f2f2f2;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 80px;
  padding-bottom: 100px;
`;
const Date = styled.p`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 23px;
  color: ${colors.darkBlue};
`;
const Sub = styled.p`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 18px;
  color: ${colors.darkGrey};
`;