import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import {
  Link,
  Outlet,
  useLocation,
  useParams,
  useMatch,
} from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchCoinInfo, fetchCoinTickers } from "../api";

const LoaderBox = keyframes`
  0%{
    transform: translateX(-150%); opacity : 0.2;
  }
  25%{
    transform: translateX(0%); opacity : 1;
  }

  50%{
    transform : translateX(150%); opacity : 0.2;
  }
  75%{
    transform: translateX(0%); opacity : 1;
  }
  100%{
    transform: translateX(-150%); opacity : 0.2;
  }
`;

const Loader = styled.span`
  display: block;
  margin: 20vh auto;
  width: 20px;
  height: 20px;
  background-color: ${(props) => props.theme.textColor};
  border-radius: 50%;
  animation: ${LoaderBox} 2.5s linear infinite;
`;

const HomeBtn = styled.button`
  position: fixed;
  left: 3vh;
  top: 3vh;
  height: 30px;
  border: none;
  border-radius: 10px;
  color: ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.subBgColor};
  a {
    font-size: 1rem;
    padding: 5px 10px;
  }
`;

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
  transition: all 0.5s ease;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 2rem;
  color: ${(props) => props.theme.accentColor};
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.subBgColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 33%;
  span:first-child {
    font-size: 14px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 7px;
  }
`;
const Description = styled.p`
  margin: 20px 0px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 25px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 400;
  background-color: ${(props) => props.theme.subBgColor};
  padding: 7px 0px;
  border: 2px solid
    ${(props) => (props.isActive ? props.theme.accentColor : "transparent")};
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.accentColor : props.theme.textColor};
  a {
    padding: 7px 0px;
    display: block;
    font-size: 16px;
  }
`;

interface RouteState {
  state: {
    name: string;
  };
}

//console.log(IInfo) => Store Object as global variable
// => Object.keys(temp1).join() : key들만 string으로 모으기
interface IInfo {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}
interface ITickers {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<string>();
  const { state } = useLocation() as RouteState;
  //useMatch Hooks : 해당 url에 위치해있는지 확인 : isExact = null/true/false
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  const { isLoading: infoLoading, data: infoData } = useQuery<IInfo>(
    ["info", coinId],
    () => fetchCoinInfo(coinId)
  );
  const { isLoading: tickersLoading, data: tickersData } = useQuery<ITickers>(
    ["tickers", coinId],
    () => fetchCoinTickers(coinId),
    {
      refetchInterval: 5000,
    }
  );

  const isLoading = infoLoading || tickersLoading;
  return (
    <Container>
      <Helmet>
        <title>
          {state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : isLoading ? "Loading..." : infoData?.name}
          <HomeBtn>
            <Link to="/">&larr;</Link>
          </HomeBtn>
        </Title>
      </Header>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>순위</span>
              <span>{infoData?.rank}위</span>
            </OverviewItem>
            <OverviewItem>
              <span>티커</span>
              <span>{infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>가격</span>
              <span>${tickersData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Supply</span>
              <span>{tickersData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{tickersData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>
          <Outlet context={{ coinId, tickersData }} />
        </>
      )}
    </Container>
  );
}

export default Coin;
