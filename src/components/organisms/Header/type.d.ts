export type IHeaderComponent = "logo" | "search" | "cart" | "dark-mode-toggle";

export interface IHeaderComponentProps {
  hiddenComponent?: IHeaderComponent[];
}
