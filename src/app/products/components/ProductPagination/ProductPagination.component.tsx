import ButtonComponent from "@/components/atoms/Button";
import TypographyComponent from "@/components/atoms/Typography";
import useQueryStringHook from "@/hooks/useQueryString.hook";

/**
 * A component that renders pagination controls for the products page.
 *
 * This component utilizes the `useQueryStringHook` to determine the current page number
 * from the URL query string and renders pagination buttons accordingly.
 * It includes the following elements:
 * - A "Previous" button ("<") to navigate to the previous page.
 * - Buttons for pages 1 and 2, if applicable, to quickly navigate to these pages.
 * - A "..." text to indicate skipped pages, if applicable.
 * - A current page indicator displaying the current page number.
 * - A "Next" button (">") to navigate to the next page.
 *
 * The buttons update the URL query string to reflect the selected page number.
 */
function ProductPaginationComponent() {
  const { getQueryString } = useQueryStringHook();

  return (
    <section className="flex items-center justify-end gap-2">
      <ButtonComponent
        onClick={() =>
          (window.location.href = `/products?page=${
            Number(getQueryString("page")) - 1
          }`)
        }
      >
        &lt;
      </ButtonComponent>
      {Number(getQueryString("page")) > 1 && (
        <ButtonComponent
          onClick={() => (window.location.href = "/products?page=1")}
        >
          1
        </ButtonComponent>
      )}
      {Number(getQueryString("page")) > 2 && (
        <ButtonComponent
          onClick={() => (window.location.href = "/products?page=2")}
        >
          2
        </ButtonComponent>
      )}
      <TypographyComponent>
        {Number(getQueryString("page")) > 3 && "..."}
      </TypographyComponent>
      <TypographyComponent as="span" className="flex items-center gap-1">
        <strong>{(Number(getQueryString("page")) || 1) ?? 1}</strong>
      </TypographyComponent>
      <ButtonComponent
        onClick={() =>
          (window.location.href = `/products?page=${
            (Number(getQueryString("page")) || 1) + 1
          }`)
        }
      >
        {(Number(getQueryString("page")) || 1) + 1}
      </ButtonComponent>
      <ButtonComponent
        onClick={() =>
          (window.location.href = `/products?page=${
            (Number(getQueryString("page")) || 1) + 1
          }`)
        }
      >
        {">"}
      </ButtonComponent>
    </section>
  );
}

export default ProductPaginationComponent;
