import axios from "axios";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import dayjs from "dayjs";
import localeBr from "dayjs/locale/pt-br"; // With a custom alias for the locale object
import localizedFormat from "dayjs/plugin/localizedFormat";
import { colors } from "../constants/colors";
import TodayHabitCard from "../components/TodayHabitCard";
import { ProgressContext } from "./HomePage";

dayjs.extend(localizedFormat);

export default function TodayPage(props) {
  const userData = useContext(UserContext);
  const [habits, setHabits] = useState([]);
  const progress = useContext(ProgressContext);

  const portugueseDays = [
    "Domingo",
    "Segunda",
    "Terça",
    "Quarta",
    "Quinta",
    "Sexta",
    "Sábado",
  ];
  let day = portugueseDays[Number(dayjs().locale(localeBr).format("d"))];
  day += ", ";
  day += dayjs().locale(localeBr).format("DD/MM");

  useEffect(() => {
    loadHabits();
  }, []);

  function loadHabits() {
    axios
      .get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      )
      .then((data) => {
        setHabits(data.data);
      });
  }
  console.log("loaded");
  return (
    <>
      <Container>
        <Date data-identifier="today-infos">{day}</Date>
        {progress > 0 && <Progress>{progress*100}% dos hábitos concluídos</Progress>}
        {progress === 0 && <NoProgress>Nenhum hábito concluído ainda</NoProgress>}
        {habits.map((habit, index) => {
          return (
            <TodayHabitCard
              key={index}
              habit={habit}
              setDoneCount={props.setDoneCount}
              doneCount={props.doneCount}
            />
          );
        })}
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
const Date = styled.p`
  margin-top: 20px;
  margin-bottom: 5px;
  font-size: 23px;
  color: ${colors.darkBlue};
`;
const NoProgress = styled.p`
  margin: 0px;
  font-size: 18px;
  color: ${colors.lightGrey};
  margin-bottom: 20px;
`;
const Progress = styled.p`
  margin: 0px;
  font-size: 18px;
  color: ${colors.green};
  margin-bottom: 20px;
`;
