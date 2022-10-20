import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState();
  const [pass, setPass] = useState();
  function handleSubmit(event) {
    event.preventDefault();
    if (email.length == 0 || pass.length == 0) {
      return;
    }
    const loginInfo = {
      email: email,
      password: pass,
    };
    axios
      .post(
        "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
        loginInfo
      )
      .then(loginSuccess)
      .catch(loginFailed);
  }

  function loginSuccess() {
    alert("siusous")
  }
  function loginFailed() {
    alert("failed")
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
        <input data-identifier="login-btn" type="submit" value="Entrar" />
      </form>
      <Link data-identifier="sign-up-action" to={`/signup/`}>
        Não tem uma conta? Cadastre-se!
      </Link>
    </>
  );
}
