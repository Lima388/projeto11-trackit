import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  const [name, setName] = useState();
  const [pfp, setPfp] = useState();
  function handleSubmit(event) {
    event.preventDefault();
    if (email.length == 0 || pass.length == 0) {
      return;
    }
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
      .then(signUpSuccess)
      .catch(signUpFailed);
  }

  function signUpSuccess() {
    alert("Signed Up");
  }
  function signUpFailed() {

    alert("Failed!");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          data-identifier="input-email"
          placeholder="email"
          type="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          data-identifier="input-password"
          placeholder="senha"
          type="password"
          name="password"
          onChange={(e) => setPass(e.target.value)}
        />
        <input
          data-identifier="input-name"
          placeholder="nome"
          type="text"
          name="nome"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          data-identifier="input-photo"
          placeholder="foto"
          type="url"
          name="foto"
          onChange={(e) => setPfp(e.target.value)}
        />
        <input data-identifier="login-btn" type="submit" value="Cadastrar" />
      </form>
      <Link data-identifier="back-to-login-action" to={`/`}>
        Já tem uma conta? Faça login!
      </Link>
    </>
  );
}
