import { useState } from "react";
import styled from "styled-components";
import { colors } from "../constants/colors";

export default function CreateHabitCard() {
  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [selected, setSelected] = useState([]);
  function selectDay(index) {
    console.log(selected.includes(index));
    if (selected.includes(index)) {
      let temp = [...selected]
      temp.splice(temp.indexOf(index), 1);
      setSelected(temp);
    } else { 
      setSelected([...selected, index]);
    }
  }
  return (
    <Card>
      <Name />
      <Weekdays>
        {weekdays.map((day, index) => {
          const select = selected.includes(index);
          return (
            <Day
              selected={select}
              key={index}
              onClick={() => {
                selectDay(index);
              }}
            >
              {day}
            </Day>
          );
        })}
      </Weekdays>
      <Buttons>
        <Cancel>Cancelar</Cancel>
        <Save>Salvar</Save>
      </Buttons>
    </Card>
  );
}

const Card = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  height: 180px;
`;
const Name = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: 1px solid ${colors.lightGrey};
  padding-left: 5px;
  ::placeholder {
    color: ${colors.lightGrey};
  }
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
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  margin-top: 20px;
`;

const Save = styled.button`
  background: none;
  border: none;

  border-radius: 5px;
  border-color: ${colors.lightBlue};

  background-color: ${colors.lightBlue};

  color: white;
  text-align: center;
  font-size: 16px;

  height: 35px;
  width: 85px;
`;
const Cancel = styled.button`
  background: none;
  border: none;

  color: ${colors.lightBlue};
  text-align: center;
  font-size: 16px;
`;
