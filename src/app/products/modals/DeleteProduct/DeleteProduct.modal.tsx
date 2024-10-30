import ButtonComponent from "@/components/atoms/Button";
import TypographyComponent from "@/components/atoms/Typography";
import ModalComponent from "@/components/organisms/Modal";
import { IDeleteProductModalProps } from "./type";

const DeleteProductModal = ({
  selectedId,
  setIsShowDeleteModal,
}: IDeleteProductModalProps): JSX.Element => {
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
        Are you sure you want to delete this {selectedId}?
      </TypographyComponent>
    </ModalComponent>
  );
};

export default DeleteProductModal;
