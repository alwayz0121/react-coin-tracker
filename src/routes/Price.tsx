import styled from "styled-components";
import { useOutletContext } from "react-router";

const Container = styled.div`
  max-width: 480px;
  margin: 50px auto 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 47%;
  height: 100px;
  border: 3px solid ${(props) => props.theme.subBgColor};
  border-radius: 10px;
  padding: 10px;
  margin: 10px 5px;
`;

const ItemTitle = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
  color: ${(props) => props.theme.textColor};
`;

const ItemText = styled.div`
  font-size: 30px;
  font-weight: 600;
  color: ${(props) => props.theme.textColor};
`;

interface PriceProps {
  tickersData: {
    quotes: {
      USD: {
        price: number;
        percent_change_1h: number;
        percent_change_6h: number;
        percent_change_12h: number;
        percent_change_24h: number;
      };
    };
  };
}

function Price() {
  const { tickersData } = useOutletContext<PriceProps>();
  return (
    <Container>
      <Item>
        <ItemTitle>1시간 전보다</ItemTitle>
        <ItemText>{tickersData.quotes.USD.percent_change_1h}%</ItemText>
      </Item>
      <Item>
        <ItemTitle>6시간 전보다</ItemTitle>
        <ItemText>{tickersData.quotes.USD.percent_change_6h}%</ItemText>
      </Item>

      <Item>
        <ItemTitle>12시간 전보다</ItemTitle>
        <ItemText>{tickersData.quotes.USD.percent_change_12h}%</ItemText>
      </Item>
      <Item>
        <ItemTitle>24시간 전보다</ItemTitle>
        <ItemText>{tickersData.quotes.USD.percent_change_24h}%</ItemText>
      </Item>
    </Container>
  );
}

export default Price;
