import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled, { keyframes } from "styled-components";
import { fetchCoins } from "../api";
import { isDarkAtom } from "../atoms";

const ToggleBtn = styled.button`
  position: fixed;
  left: 3vh;
  top: 3vh;
  height: 30px;
  border: none;
  border-radius: 10px;
  background-color: ${(props) => props.theme.textColor};
  padding: 5px 10px;
  cursor: pointer;
  transition: all 0.5s ease;
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
  font-size: 2.5rem;
  color: ${(props) => props.theme.accentColor};
`;

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

const CoinsList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const Coin = styled.li`
  background-color: ${(props) => props.theme.subBgColor};
  color: ${(props) => props.theme.textColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color 0.2s ease-in;
  }
  &:hover {
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Icon = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 12px;
`;

interface ICoin {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

function Coins() {
  const isDark = useRecoilValue(isDarkAtom);
  const setDarkAtom = useSetRecoilState(isDarkAtom);
  const toggleDarkAtom = () => setDarkAtom((prev) => !prev);
  //useQuery??? fetcher ????????? ?????? ???, ??????????????? isLoading, fetcher?????? ????????? ?????? data.json??? ?????????
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  // Without react-query (api.ts ??????)
  // const [coins, setCoins] = useState<ICoin[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100)); //100??? ????????? ????????????
  //     setLoading(false);
  //   })();
  // }, []);

  return (
    <Container>
      <Helmet>
        <title>Coin Tracker</title>
      </Helmet>
      <Header>
        <Title>Coin Tracker</Title>
        <ToggleBtn onClick={toggleDarkAtom}>{isDark ? "????" : "????"}</ToggleBtn>
      </Header>
      {isLoading ? (
        <Loader></Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}/chart`} state={coin}>
                <Icon
                  src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                  alt={coin.name}
                />
                {coin.name} &rarr;
              </Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;
