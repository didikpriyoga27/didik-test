import ButtonComponent from "@/components/atoms/Button";
import { SearchIcon } from "@/components/atoms/Icons";
import InputComponent from "@/components/atoms/Input";

/**
 * A component that renders a search input and a search button.
 *
 * @returns A JSX element representing the search input component.
 */
const SearchInputComponent = () => {
  return (
    <div className="flex items-center gap-2">
      <InputComponent />
      <ButtonComponent>
        <SearchIcon className="dark:invert" />
      </ButtonComponent>
    </div>
  );
};

export default SearchInputComponent;
