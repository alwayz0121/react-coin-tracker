import { useOutletContext } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";
import styled from "styled-components";

const ErrorMessage = styled.h1`
  font-size: 1.2rem;
  color: ${(props) => props.theme.accentColor};
  text-align: center;
  margin-top: 20px;
`;

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
  isDark: boolean;
}

function Chart() {
  const { coinId, isDark } = useOutletContext<ChartProps>();
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["coinHistory", coinId],
    () => fetchCoinHistory(coinId),
    {
      refetchInterval: 5000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : data?.length === undefined ? (
        <ErrorMessage>가격 데이터를 찾을 수 없습니다.</ErrorMessage>
      ) : (
        <>
          <ApexChart
            type="line"
            series={[
              {
                //data : IHistorical array 형태
                name: "Price",
                data: data?.map((price) => Number(price.close)) as number[],
              },
            ]}
            width="100%"
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 250,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 4,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#0be881"], stops: [0, 100] },
              },
              colors: ["#0fbcf9"],
              tooltip: {
                y: {
                  formatter: (value) => `$${value.toFixed(2)}`,
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            series={[
              {
                //data : IHistorical array 형태
                name: "Price",
                data: data?.map((data) => {
                  return [
                    data.time_close,
                    data.open,
                    data.high,
                    data.low,
                    data.close,
                  ];
                }) as any,
              },
            ]}
            width="100%"
            options={{
              theme: {
                mode: isDark ? "dark" : "light",
              },
              chart: {
                height: 250,
                width: 500,
                toolbar: {
                  show: false,
                },
                background: "transparent",
              },
              grid: { show: false },
              stroke: {
                curve: "smooth",
                width: 3,
              },
              yaxis: {
                show: false,
              },
              xaxis: {
                axisBorder: { show: false },
                axisTicks: { show: false },
                labels: { show: false },
                type: "datetime",
                categories: data?.map((price) => price.time_close),
              },
            }}
          />
        </>
      )}
    </div>
  );
}

export default Chart;
