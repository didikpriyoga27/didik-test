import { CartIcon } from "@/components/atoms/Icons";
import DarkModeToggleComponent from "@/components/molecules/DarkModeToggle/DarkModeToggle.component";
import Image from "next/image";
import Link from "next/link";
import { ReactElement } from "react";
import ButtonComponent from "../../atoms/Button";
import SearchInputComponent from "../../molecules/SearchInput";
import { IHeaderComponent, IHeaderComponentProps } from "./type";

/**
 * A component that renders the application's header.
 *
 * The header includes optional components such as the logo, search input,
 * cart button, and dark mode toggle button. The visibility of these components
 * can be controlled via the `hiddenComponent` prop.
 *
 * @param {IHeaderComponentProps} props - The props for the header component.
 * @param {IHeaderComponent[]} [props.hiddenComponent=[]] - An array of component
 * names to hide, which can include "logo", "search", "cart", and "dark-mode-toggle".
 *
 * @returns {ReactElement} A JSX element representing the header component.
 */
const HeaderComponent = ({
  hiddenComponent = [],
}: IHeaderComponentProps): ReactElement => {
  const allComponent: IHeaderComponent[] = [
    "logo",
    "search",
    "cart",
    "dark-mode-toggle",
  ];
  const renderedComponent = allComponent.filter(
    (component) => !hiddenComponent.includes(component)
  );

  return (
    <header className="flex py-4 w-full justify-center">
      <div className="flex items-center justify-between w-11/12">
        {renderedComponent.includes("logo") && (
          <Link href="/products">
            <Image
              src="/next.svg"
              alt="Next.js logo"
              width={180}
              height={38}
              priority
              className="dark:invert cursor-pointer"
            />
          </Link>
        )}
        <div className="flex gap-2">
          {renderedComponent.includes("search") && <SearchInputComponent />}
          {renderedComponent.includes("cart") && (
            <ButtonComponent href={"/cart"}>
              <CartIcon className="dark:invert" />
            </ButtonComponent>
          )}
          {renderedComponent.includes("dark-mode-toggle") && (
            <DarkModeToggleComponent />
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
