import React from "react";
import Routers from "./route";
import { Provider } from "react-redux";
import store from "./store";
import { Auth0Provider } from "@auth0/auth0-react";
import { auth0 } from "./data/config";
import { SnackbarProvider } from "notistack";

const App = () => (
  <div className="App">
    <SnackbarProvider maxSnack={5}>
      <Auth0Provider
        domain={auth0.domain}
        clientId={auth0.clientId}
        redirectUri={auth0.redirectUri}
      >
        <Provider store={store}>
          <Routers />
        </Provider>
      </Auth0Provider>
    </SnackbarProvider>
  </div>
);

export default App;
