export type IHeaderComponent =
  | "logo"
  | "search"
  | "cart"
  | "dark-mode-toggle"
  | "wagmi";

export interface IHeaderComponentProps {
  hiddenComponent?: IHeaderComponent[];
}
