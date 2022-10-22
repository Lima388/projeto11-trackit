import styled from "styled-components";
import { colors } from "../constants/colors";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function NavBar(){
  return (
    <>
      <Header/>
      <Footer/>
    </>
  )
}
function Footer() {
  const percentage = 66;

  return (
    <BotBar>
      <p>
        Hábitos
      </p>
      <Circle>
        <CircularProgressbar
          value={percentage}
          text={`Circle`}
          background
          backgroundPadding={6}
          styles={buildStyles({
            backgroundColor: colors.lightBlue,
            textColor: "#fff",
            pathColor: "#fff",
            trailColor: "transparent",
          })}
        />
      </Circle>
      <p>
        Histórico
      </p>
    </BotBar>
  );
}
function Header(){
  return(
    <Bar>
      <p>
        TrackIt
      </p>
      <img src="https://lh3.googleusercontent.com/WebglHOYlW-2P7ADP9oUSSrgy12PHyAE6GP_jmJkQOZZ1XH7Pa_7216EK2qS7iJFvncqOaDjg40BrYdzPbB9qNwn"/>
    </Bar>
  )
}
const Circle = styled.div`
  position: absolute;
  left: 50%;
  right: 50%;
  height: 90px;
  width: 90px;
  transform: translate(-50%, -20%); 
`;
const Bar = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  height: 70px;
  background-color: ${colors.darkBlue};


  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 15px;
  padding-right: 15px;
  align-items: center;
  
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  
  p{
    font-size: 39px;
    font-family: 'Playball', cursive;
    color: white;
  }
  
  img{
    height: 51px;
    width: 51px;
    border-radius: 25px;
  }
`
const BotBar = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: white;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-left: 30px;
  padding-right: 30px;
  align-items: center;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;

  p {
    font-size: 39px;
    color: ${colors.lightBlue};
    font-size: 18px;
  }
`;