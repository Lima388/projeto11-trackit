import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "../App";
import NavBar from "../components/Navbar";
import HabitsPage from "./HabitsPage";
import HistoryPage from "./HistoryPage";
import TodayPage from "./TodayPage";

export const ProgressContext = createContext();

export default function HomePage(props) {
  const [doneCount, setDoneCount] = useState(-1);
  const [dailyHabitCount, setDailyHabitCount] = useState();
  const [progress, setProgress] = useState(0);

  const userData = useContext(UserContext);

  useEffect(() => {
    axios
      .get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      )
      .then((data) => {
        setDailyHabitCount(data.data.length);
        setDoneCount(getDoneCount(data.data));
        if(data.data.length>0){
          setProgress(getDoneCount(data.data) / data.data.length);
        }
        
      });
  }, []);

  useEffect(() => {
    if (doneCount == -1) {
      return;
    }
    if( dailyHabitCount>0){
      setProgress(doneCount / dailyHabitCount);
    }else{
      setProgress(0);
    }
    
  }, [doneCount, dailyHabitCount]);

  function getDoneCount(habits) {
    let done = 0;
    for (let i = 0; i < habits.length; i++) {
      if (habits[i].done) {
        done++;
      }
    }
    return done;
  }

  function updateDailyHabitCount() {
    axios
      .get(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
        {
          headers: { Authorization: `Bearer ${userData.token}` },
        }
      )
      .then((data) => {
        setDailyHabitCount(data.data.length);
        setDoneCount(getDoneCount(data.data));
      });
  }

  return (
    <>
      <ProgressContext.Provider value={progress}>
        <NavBar />
        {props.index == 1 && (
          <TodayPage setDoneCount={setDoneCount} doneCount={doneCount} />
        )}
      </ProgressContext.Provider>
      {props.index == 0 && (
        <HabitsPage updateDailyHabitCount={updateDailyHabitCount} />
      )}
      {props.index == 2 && <HistoryPage />}
    </>
  );
}