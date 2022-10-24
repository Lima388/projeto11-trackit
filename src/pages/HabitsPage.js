import styled from "styled-components";
import { colors } from "../constants/colors";
import NavBar from "../components/Navbar";
import CreateHabitCard from "../components/CreateHabitCard";
import EditHabitCard from "../components/EditHabitCard";
import { UserContext } from "../App";
import { useContext, useEffect, useState } from "react";
import axios from "axios";

export default function HabitsPage() {
  const userData = useContext(UserContext);
  const [habits, setHabits] = useState([]);
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    axios
      .get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      )
      .then((data) => {
        setHabits(data.data);
      });
  }, []);

  return (
    <>
      <NavBar />
      
      <Container>
        <Create
          onClick={() => {
            setCreating(true);
          }}
        >
          <p>Meus hábitos</p>
          <div>+</div>
        </Create>
        {habits.map((data, key) => {
          return <EditHabitCard data={data} habits={setHabits} key={key} />;
        })}
        <CreateHabitCard habits={setHabits} creating={creating} setCreating={setCreating} />
        {/* {creating && <CreateHabitCard habits={setHabits} creating={creating} setCreating={setCreating} />} */}
        {habits.length == 0 && (
          <Empty>
            Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para
            começar a trackear!
          </Empty>
        )}
      </Container>
    </>
  );
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
