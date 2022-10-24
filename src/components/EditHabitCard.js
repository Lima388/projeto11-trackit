import styled from "styled-components";
import { colors } from "../constants/colors";
import { TrashOutline } from "react-ionicons";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../App";

export default function EditHabitCard(props) {
  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const {id, name, days} = props.data;
  const userData = useContext(UserContext);

  function deleteHabit() {
    axios
      .delete(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/"+id,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      )
      .then(() => {
        loadHabits();
      });
  }
  function loadHabits() {
    axios
      .get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      )
      .then((data) => {
        props.habits(data.data);
      });
  }

  return (
    <Card>
      <Name>{name}</Name>
      <Weekdays>
        {weekdays.map((day, index) => {
          const select = days.includes(index);
          return (
            <Day
              selected={select}
              key={index}
            >
              {day}
            </Day>
          );
        })}
      </Weekdays>
      <Buttons onClick={deleteHabit}>
        <TrashOutline color={"#6b6b6b"} height="20px" width="20px" />
      </Buttons>
    </Card>
  );
}

const Card = styled.div`
  position: relative;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
`;

const Name = styled.p`
  width: 100%;
  color: ${colors.darkGrey};
  font-size: 20px;
  margin: 0px;
`;
const Weekdays = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 10px;
`;
const Day = styled.button`
  margin-right: 5px;
  height: 30px;
  width: 30px;
  border-radius: 5px;
  background-color: ${(props) =>
    props.selected === false ? "white" : colors.lightGrey};
  border: 1px solid ${colors.lightGrey};
  color: ${(props) => (props.selected === true ? "white" : colors.lightGrey)};
  font-size: 20px;
`;
const Buttons = styled.div`
position: absolute;
  right:10px;
  top: 10px;
`;
