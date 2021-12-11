import React from "react";
import Button from "@material-ui/core/Button";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../../Store/Slices/functionality.slice";
import styles from "../Login.module.scss";

interface IProps {
  isDisabled: boolean;
  login: string;
  password: string;
  id: string;
}

const LoginSubmitButton = (props: IProps) => {
  const dispatch = useDispatch();
  function buttonClicked() {
    dispatch(
      authenticateUser({ login: props.login, password: props.password })
    );
  }
  return (
    <Button
      id={props.id}
      className={styles.loginBtn}
      variant="contained"
      color="primary"
      onClick={buttonClicked}
      disabled={props.isDisabled}
    >
      Zaloguj
    </Button>
  );
};

export default LoginSubmitButton;
