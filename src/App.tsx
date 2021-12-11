import { useSelector } from "react-redux";
import "./App.css";
import Layout from "./Components/Layout/Layout";
import { Redirect, Route, Switch } from "react-router-dom";
import Couriers from "./Components/Couriers/Couriers";
import AddData from "./Components/AddData/addData";
import Login from "./Components/Login/Login";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import Packages from "./Components/Packages/Packages";
import AddCourier from "./Components/AddData/addCourier/addCourier";
import AddClient from "./Components/AddData/addClient/addClient";
import AddPackage from "./Components/AddData/addPackage/addPackage";
import AddRegistration from "./Components/AddData/addRegistration/addRegistration";
import Registrations from "./Components/Registrations/Registrations";
import { AppState } from ".";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#287cfb",
    },
    secondary: {
      main: "#287cfb",
    },
  },
});

function App() {
  const incorrectInputMessage = useSelector(
    (state: AppState) => state.functionality.incorrectLoginInputMessage
  );
  const canRead = useSelector((state: AppState) => state.functionality.canRead);
  const canWrite = useSelector((state: AppState) => state.functionality.canWrite);
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <Layout>
          {canRead ? (
            <Switch>
              <Route exact path="/nowy">
                {
                  canWrite ? <AddData />
                    : <Redirect to="/login" />

                }
              </Route>
              <Route path="/nowy/kurier">
                {
                  canWrite ? <AddCourier />
                    : <Redirect to="/login" />

                }
              </Route>
              <Route path="/nowy/klient">
                {
                  canWrite ? <AddClient />
                    : <Redirect to="/login" />

                }
              </Route>
              <Route path="/nowy/przesylka">
                {
                  canWrite ? <AddPackage />
                    : <Redirect to="/login" />

                }
              </Route>
              <Route path="/nowy/zgloszenie">
                {
                  canWrite ? <AddRegistration />
                    : <Redirect to="/login" />

                }
              </Route>
              <Route path="/kurierzy">
                <Couriers />
              </Route>
              <Route path="/przesylki">
                <Packages />
              </Route>
              <Route path="/powiadomienia">
                <Registrations />
              </Route>
              <Route exact path="/">
                <Redirect to="/kurierzy" />
              </Route>
              <Route path="*">
                <Redirect to="/kurierzy" />
              </Route>
            </Switch>
          ) : (
            <Switch>
              <Route path="/login">
                <Login incorrectInputMessage={incorrectInputMessage} />
              </Route>
              <Route path="*">
                <Redirect to="/login" />
              </Route>
            </Switch>
          )}
        </Layout>
      </div>
    </ThemeProvider>
  );
}

export default App;
