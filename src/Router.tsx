import { BrowserRouter, Routes, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";
import Chart from "./routes/Chart";
import Price from "./routes/Price";

interface IRouterProps {
  toggleDark: () => void; //argument 받지 않고, return을 아무것도 하지 않는 형식이다 라고 선언
  isDark: boolean;
}

//typescript는 항상 type을 선언해준다
function Router({ toggleDark, isDark }: IRouterProps) {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/:coinId" element={<Coin isDark={isDark} />}>
          <Route path={"price"} element={<Price />} />
          <Route path={"chart"} element={<Chart />} />
        </Route>

        <Route
          path="/"
          element={<Coins toggleDark={toggleDark} isDark={isDark} />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
