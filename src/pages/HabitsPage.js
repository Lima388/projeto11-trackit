import styled from "styled-components";
import { colors } from "../constants/colors";
import NavBar from "../components/Navbar";
import CreateHabitCard from "../components/CreateHabitCard";

export default function HabitsPage() {
  return (
    <>
      <NavBar />
      <Container>
        <Create>
          <p>Meus hábitos</p>
          <div>+</div>
        </Create>
        <CreateHabitCard/>
        <Empty>
          Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
          começar a trackear!
        </Empty>
      </Container>
    </>
  );
}

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  background-color: #f2f2f2;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 80px;
  padding-bottom: 80px;
`;
const Create = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  p {
    color: ${colors.darkBlue};
    font-size: 23px;
  }
  div {
    height: 35px;
    width: 40px;

    border-radius: 5px;

    background-color: ${colors.lightBlue};

    color: white;
    text-align: center;
    font-size: 27px;
  }
`;
const Empty = styled.p`
  font-size: 18px;
  color: ${colors.darkGrey};
  line-height: 22.5px;
`;
const HabitList = styled.div`
  display: flex;
`;
