import { useContext, useState } from "react";
import styled from "styled-components";
import { colors } from "../constants/colors";
import { Checkbox } from "react-ionicons";
import axios from "axios";
import { UserContext } from "../App";

export default function TodayHabitCard(props) {
  const userData = useContext(UserContext);
  const [habit,setHabit] = useState(props.habit);
  function done() {
    if (!habit.done) {
      const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/check`;
      axios
        .post(url, null, {
          headers: { Authorization: `Bearer ${userData.token}` },
        })
        .then(updateHabit());
    } else {
      const url = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${habit.id}/uncheck`;
      axios
        .post(url, null, {
          headers: { Authorization: `Bearer ${userData.token}` },
        })
        .then(updateHabit());
    }
  }
  function updateHabit(){
    let add = 0;
    if(habit.done == true){
      add--;
    }else{
      add++;
    }
    let newHabit = {
      "id": habit.id,
      "name": habit.name,
      "done": !habit.done,
      "currentSequence": habit.currentSequence+add,
      "highestSequence": habit.highestSequence+add,
    };
    setHabit(newHabit);
    UpdateProgress(add);
  }
  function UpdateProgress(add){
    props.setDoneCount(props.doneCount+add);
  }

  return (
    <Card>
      <Name>{habit.name}</Name>
      <Sequence done={habit.done}>
        Sequência atual: <span>{habit.currentSequence}</span>
      </Sequence>
      <Sequence
        done={
          habit.currentSequence >= habit.highestSequence &&
          habit.highestSequence > 0
        }
      >
        Sequência atual: <span>{habit.currentSequence}</span>
      </Sequence>
      <DoneButton onClick={done} data-identifier="done-habit-btn">
        <Checkbox
          color={habit.done ? colors.green : colors.lightGrey}
          height="80px"
          width="80px"
        />
      </DoneButton>
    </Card>
  );
}
const Card = styled.div`
  position: relative;
  padding: 15px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const Name = styled.p`
  width: 100%;
  color: ${colors.darkGrey};
  font-size: 20px;
  margin: 0px;
  margin-bottom: 10px;
`;

const Sequence = styled.p`
  margin: 0px;
  margin-bottom: 3px;
  font-size: 13px;
  color: ${colors.darkGrey};
  span {
    color: ${(props) => (props.done === true ? colors.green : colors.darkGrey)};
  }
`;

const DoneButton = styled.button`
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  height: 100%;
  position: absolute;
  right: 10px;
  top: 0;
`;
