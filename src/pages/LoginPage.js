import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import logo from "../assets/Logo.png";
import ReactLoading from "react-loading";
import { UserContext } from "../App";


export default function LoginPage(props) {

  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();
    if (email.length == 0 || pass.length == 0) {
      return;
    }
    const loginInfo = {
      email: email,
      password: pass,
    };

    setLoading(true);

    axios
      .post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
        loginInfo
      )
      .then(success)
      .catch(fail);
  }

  function success(received) {
    props.set(received.data);
    navigate("/habits");
  }
  function fail() {
    setLoading(false);
    alert("Failed!");
  }

  return (
    <Container>
      <Logo src={logo} alt="falhou" />
      <Form onSubmit={handleSubmit}>
        <Field
          data-identifier="input-email"
          placeholder="email"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <Field
          data-identifier="input-password"
          placeholder="senha"
          type="password"
          name="password"
          onChange={(e) => setPass(e.target.value)}
        />

        {loading && (
          <Loading>
            <ReactLoading type={"bubbles"} color={"white"} width={"20%"} />
          </Loading>
        )}
        {!loading && (
          <Submit data-identifier="login-btn" type="submit" value="Entrar" />
        )}
        
      </Form>
      <Link data-identifier="sign-up-action" to={`/signup/`}>
        <SignUp>Não tem uma conta? Cadastre-se!</SignUp>
      </Link>
    </Container>
  );
}
const Container = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
`;
const Logo = styled.img`
  width: 50%;
  /*   aspect-ratio: 804/721; */
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
`;
const Field = styled.input`
  height: 45px;
  width: 300px;

  border: none;
  border: 1px solid #dbdbdb;
  border-radius: 5px;

  margin-bottom: 10px;
  font-size: 20px;

  padding-left: 5px;

  ::placeholder {
    color: #dbdbdb;
  }
`;
const Submit = styled.input`
  height: 45px;
  width: 300px;

  margin-bottom: 20px;

  background-color: #52b6ff;

  font-size: 21px;
  color: white;

  border: none;
  border-radius: 5px;
`;

const Loading = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 45px;
  width: 300px;

  margin-bottom: 20px;

  background-color: #52b6ff;

  font-size: 21px;
  color: white;

  border: none;
  border-radius: 5px;
`;


const SignUp = styled.p`
  font-size: 14px;
  color: #52b6ff;
`;
