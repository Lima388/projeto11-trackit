import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import { UserContext } from "../App";
import { colors } from "../constants/colors";
import ReactLoading from "react-loading";

export default function CreateHabitCard(props) {
  const weekdays = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [selected, setSelected] = useState([]);
  const [name, setName] = useState("");
  const userData = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  function selectDay(index) {
    if (loading) {
      return;
    }
    if (selected.includes(index)) {
      let temp = [...selected];
      temp.splice(temp.indexOf(index), 1);
      setSelected(temp);
    } else {
      setSelected([...selected, index]);
    }
  }
  function createHabit() {
    setLoading(true);
    const data = {
      name: name,
      days: selected,
    };
    axios
      .post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
        data,
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      )
      .then(() => {
        loadHabits();
        props.setCreating(false);
        setName("");
        setSelected([]);
        setLoading(false);
        props.updateDailyHabitCount();
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
    <>
      {props.creating && (
        <Card>
          <Name
            data-identifier="input-habit-name"
            placeholder="nome do hábito"
            value={name.length > 0 ? name : ""}
            onChange={(e) => setName(e.target.value)}
          />
          <Weekdays>
            {weekdays.map((day, index) => {
              const select = selected.includes(index);
              return (
                <Day
                  data-identifier="week-day-btn"
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
            {loading && (
              <Loading>
                <ReactLoading
                  type={"bubbles"}
                  color={"white"}
                  height={35}
                  width={70}
                />
              </Loading>
            )}
            {!loading && (
              <Cancel
                data-identifier="cancel-habit-create-btn"
                onClick={() => props.setCreating(false)}
              >
                Cancelar
              </Cancel>
            )}
            {!loading && <Save data-identifier="save-habit-create-btn" onClick={createHabit}>Salvar</Save>}
          </Buttons>
        </Card>
      )}
    </>
  );
}

const Card = styled.div`
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  margin-bottom: 10px;
`;
const Name = styled.input`
  width: 100%;
  height: 45px;
  border-radius: 5px;
  border: 1px solid ${colors.lightGrey};
  padding-left: 5px;
  ::placeholder {
    color: ${colors.lightGrey};
    font-size: 20px;
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
const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 35px;
  width: 85px;

  background-color: #aadbff;

  border: none;
  border-radius: 5px;

  div {
    transform: translate(0, -50%);
  }
`;
