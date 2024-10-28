import Image from "next/image";
import { ReactElement } from "react";
import ButtonComponent from "../../atoms/Button";
import TitleComponent from "../../atoms/Title";
import SearchInputComponent from "../../molecules/SearchInput";

/**
 * A component that renders a header for the application.
 *
 * It includes the Next.js logo, the title of the application, and a search input,
 * a cart button, and a button to toggle dark mode.
 *
 * @returns {ReactElement} A JSX element representing the header component.
 */
const HeaderComponent = (): ReactElement => {
  return (
    <header className="flex items-center justify-between py-4 px-16 w-full">
      <Image
        src="/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
        className="dark:invert"
      />
      <TitleComponent>{"Products"}</TitleComponent>
      <div className="flex gap-2">
        <SearchInputComponent />
        <ButtonComponent>Cart</ButtonComponent>
        <ButtonComponent>Dark Mode</ButtonComponent>
      </div>
    </header>
  );
};

export default HeaderComponent;
