import Image from "next/image";
import { ReactElement } from "react";
import ButtonComponent from "../../atoms/Button";
import SearchInputComponent from "../../molecules/SearchInput";

/**
 * A component that renders a header for the application.
 *
 * The header includes the Next.js logo, a search input, a cart button,
 * and a button to toggle dark mode. It is styled using Tailwind CSS for layout.
 *
 * @returns {ReactElement} A JSX element representing the header component.
 */
const HeaderComponent = (): ReactElement => {
  return (
    <header className="flex py-4 w-full justify-center">
      <div className="flex items-center justify-between w-11/12">
        <Image
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
          className="dark:invert"
        />
        <div className="flex gap-2">
          <SearchInputComponent />
          <ButtonComponent>Cart</ButtonComponent>
          <ButtonComponent>Dark Mode</ButtonComponent>
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
