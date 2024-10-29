import ButtonComponent from "../../atoms/Button";
import InputComponent from "../../atoms/Input";

/**
 * A component that renders a search input and a search button.
 *
 * @returns A JSX element representing the search input component.
 */
const SearchInputComponent = () => {
  return (
    <div className="flex items-center gap-2">
      <InputComponent />
      <ButtonComponent>Search</ButtonComponent>
    </div>
  );
};

export default SearchInputComponent;
