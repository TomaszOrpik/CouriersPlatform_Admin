import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import styles from "./Login.module.scss";
import LoginSubmitButton from "./LoginSubmitButton/LoginSubmitButton";
import { InstructionsService } from "../../Services/Instructions.service";

interface IState {
  login: string;
  loginTouched: boolean;
  password: string;
  passwordTouched: boolean;
}
interface IProps {
  incorrectInputMessage: string;
}

class Login extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      login: "",
      loginTouched: false,
      password: "",
      passwordTouched: false,
    };
  }

  componentDidMount() {
    setTimeout(() => {
      InstructionsService.execute('login', 10, [
        {
          element: '#loginInput',
          title: 'Login',
          description: 'Wprowadź tutaj swój login do aplikacji, który dostałeś od przełożonego',
          position: 'left',
        },
        {
          element: '#passwordInput',
          title: 'Hasło',
          description: 'Wprowadź tutaj swoje hasło do aplikacji, który dostałeś od przełożonego',
          position: 'right',
        },
        {
          element: '#loginBtn',
          title: 'Logowanie',
          description: 'Po wprowadzeniu poprawnych danych wciśnij by się zalogować',
          position: 'bottom',

        }
      ]);
    }, 500);
  }

  hadleLoginChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({
      login: event.target.value as string,
      loginTouched: true,
    });
  };
  handlePasswordChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    this.setState({
      password: event.target.value as string,
      passwordTouched: true,
    });
  };

  render() {
    return (
      <div className={styles.loginModal}>
        <img
          className={styles.logoBig}
          src="./assets/logoExample.svg"
          alt="logoImage"
        />
        <form>
          <TextField
            className={styles.customInput}
            error={
              this.state.login.length === 0 && this.state.loginTouched
                ? true
                : false
            }
            id="loginInput"
            label="Login"
            helperText={this.state.login.length === 0 ? "Wpisz login" : ""}
            variant="outlined"
            onChange={this.hadleLoginChange}
          />
          <TextField
            className={styles.customInput}
            error={
              this.state.password.length === 0 && this.state.passwordTouched
                ? true
                : false
            }
            id="passwordInput"
            type="password"
            label="Hasło"
            helperText={this.state.password.length === 0 ? "Wpisz hasło" : ""}
            variant="outlined"
            onChange={this.handlePasswordChange}
          />
          <br />
          <span className={styles.serverValidator}>
            {this.props.incorrectInputMessage}
          </span>
          <LoginSubmitButton
            id="loginBtn"
            isDisabled={
              this.state.login.length === 0 || this.state.password.length === 0
                ? true
                : false
            }
            login={this.state.login}
            password={this.state.password}
          />
        </form>
      </div>
    );
  }
}

export default Login;
