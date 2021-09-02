import "./styles.css";
import IMAGE from "./react.jpg";
import { Counter } from "./Counter";
import Hoop from "./Hoop";

export const App = () => {
  return (
    <>
      <h1>
        React TypeScript Webpack Starter Template - {process.env.NODE_ENV}{" "}
        {process.env.name}
      </h1>
      <img src={IMAGE} alt="React Logo" width="300" height="200" />
      <Counter />
      <Hoop />
    </>
  );
};
