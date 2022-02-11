import NotFind from "page/NotFind/NotFind";
import Prototype from "page/Prototype/Prototype";
import Home from "../page/Home/Home";

const routers: any = [
  {
    path: "/",
    element: NotFind,
    router: [
      {
        path: "/home",
        element: Home,
      },
      {
        path: "/proto",
        element: Prototype,
      },
    ],
  },
];
export default routers;
