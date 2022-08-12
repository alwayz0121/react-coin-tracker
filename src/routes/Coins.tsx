import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import styled, { keyframes } from "styled-components";
import { fetchCoins } from "../api";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
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
  //useQuery는 fetcher 함수를 부른 후, 로딩중이면 isLoading, fetcher함수 끝나면 부른 data.json을 불러옴
  const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
  // Without react-query (api.ts 참고)
  // const [coins, setCoins] = useState<ICoin[]>([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   (async () => {
  //     const response = await fetch("https://api.coinpaprika.com/v1/coins");
  //     const json = await response.json();
  //     setCoins(json.slice(0, 100)); //100개 정보만 가져오기
  //     setLoading(false);
  //   })();
  // }, []);
  return (
    <Container>
      <Header>
        <Title>Coin</Title>
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
