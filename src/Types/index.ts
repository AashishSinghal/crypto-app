export interface ICryptocurrencies {
  simplified?: boolean;
}
export interface INews {
  simplified?: boolean;
}

export interface IParams {
  coinId: string;
}

export interface ILineChartProps {
  coinHistory: any;
  currentPrice: any;
  coinName: any;
}

export interface ILoaderProps {
  tip?: string;
  message: string;
}
