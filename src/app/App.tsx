import "./App.css";
import React from "react";
import routers from "../config/routers";

import RouteConfig from "../config/renderRoutes";

const App: React.FC = () => {
  return <RouteConfig router={routers} />;
};

export default App;
