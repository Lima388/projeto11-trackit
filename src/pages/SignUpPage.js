import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import logo from '../assets/Logo.png'
import ReactLoading from "react-loading";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [name, setName] = useState();
  const [pfp, setPfp] = useState();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  

  function handleSubmit(event) {
    event.preventDefault();
    if (email.length == 0 || pass.length == 0) {
      return;
    }

    setLoading(true);
    const signUpInfo = {
      email: email,
      name: name,
      image: pfp,
      password: pass,
    };

    axios
      .post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
        signUpInfo
      )
      .then(success)
      .catch(fail);
  }

  function success() {
    navigate("/");
  }
  function fail() {
    setLoading(false);
    alert("Cadastro falhou!");
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
        <Field
          data-identifier="input-name"
          placeholder="nome"
          type="text"
          name="nome"
          onChange={(e) => setName(e.target.value)}
        />
        <Field
          data-identifier="input-photo"
          placeholder="foto"
          type="url"
          name="foto"
          onChange={(e) => setPfp(e.target.value)}
        />
        {loading && (
          <Loading>
            <ReactLoading type={"bubbles"} color={"white"} width={"20%"} />
          </Loading>
        )}
        {!loading && (
          <Submit data-identifier="login-btn" type="submit" value="Cadastrar" />
        )}
      </Form>
      <Link data-identifier="back-to-login-action" to={`/`}>
        <SignUp>J?? tem uma conta? Fa??a login!</SignUp>
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
