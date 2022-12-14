const BASE_URL = `https://api.coinpaprika.com/v1`;

//fetcher함수는 fetch promise를 꼭 return 해야 한다
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`).then((res) => res.json());
}

export function fetchCoinInfo(coinId: string | undefined) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((res) => res.json());
}

export function fetchCoinTickers(coinId: string | undefined) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((res) => res.json());
}

export function fetchCoinHistory(coinId: string) {
  return fetch(
    `https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`
  ).then((res) => res.json());
}
