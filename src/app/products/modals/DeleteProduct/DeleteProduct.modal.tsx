import ButtonComponent from "@/components/atoms/Button";
import ModalComponent from "@/components/atoms/Modal";
import TypographyComponent from "@/components/atoms/Typography";
import useToastHook from "@/hooks/useToast.hook";
import useTranslationHook from "@/i18n/useTranslation.hook";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import useMutationProductHook from "../../hooks/useMutationProduct.hook";
import { IDeleteProductModalProps } from "./type";

/**
 * A modal component for deleting a product.
 *
 * This component displays a confirmation modal to delete a product.
 * It shows the selected product ID and provides "Cancel" and "Delete" buttons.
 * When the "Delete" button is clicked, it triggers a mutation to delete the product
 * and shows a success or error message based on the outcome.
 * It also updates the product list by invalidating the relevant query.
 *
 * @param {IDeleteProductModalProps} props - The props for the modal component.
 * @returns {JSX.Element} A JSX element representing the delete product modal.
 */
const DeleteProductModal = ({
  selectedProduct,
  setIsShowDeleteModal,
}: IDeleteProductModalProps): JSX.Element => {
  const { t } = useTranslationHook();
  const { mutateDeleteProduct } = useMutationProductHook();
  const { successMessage, errorMessage } = useToastHook();

  const queryClient = useQueryClient();

  const handleDeleteOnClick = useCallback(() => {
    mutateDeleteProduct(selectedProduct.id)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ["products"] });
        setIsShowDeleteModal(false);
        successMessage(t("products:successDeletedProduct"));
      })
      .catch(() => {
        errorMessage(t("products:errorDeletedProduct"));
      });
  }, [
    errorMessage,
    mutateDeleteProduct,
    queryClient,
    selectedProduct.id,
    setIsShowDeleteModal,
    successMessage,
    t,
  ]);

  return (
    <ModalComponent>
      <div className="flex justify-between items-center mb-2">
        <TypographyComponent as="h2" className="text-lg font-bold">
          Delete Product
        </TypographyComponent>
        <ButtonComponent
          onClick={() => setIsShowDeleteModal(false)}
          className="text-xl font-bold text-black dark:text-white"
        >
          &times;
        </ButtonComponent>
      </div>
      <TypographyComponent>
        Are you sure you want to delete this {selectedProduct.title}?
      </TypographyComponent>
      <div className="flex justify-between items-center mt-4">
        <ButtonComponent onClick={() => setIsShowDeleteModal(false)}>
          Cancel
        </ButtonComponent>
        <ButtonComponent variant="danger" onClick={handleDeleteOnClick}>
          Delete
        </ButtonComponent>
      </div>
    </ModalComponent>
  );
};

export default DeleteProductModal;
