import Modal from "react-modal";
import "./styles.css";
import { useForm } from "react-hook-form";
import { AxiosError } from "axios";
import { createProduct } from "../../api/company/company";
import { storageGetCompanyToken } from "../../storage/storageCompany";

interface Product {
  name: string;
  category: string;
  description: string;
  images: FileList | null;
}

interface ModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

function ProductModal({ isOpen, onRequestClose }: ModalProps) {
  const { register, handleSubmit, reset } = useForm<Product>();

  async function onSubmit(data: Product) {
    const token = storageGetCompanyToken() || "";

    try {
      const formData = new FormData();

      formData.append(
        "product",
        new Blob(
          [
            JSON.stringify({
              name: data.name,
              category: data.category,
              description: data.description,
            }),
          ],
          { type: "application/json" }
        )
      );

      if (data.images) {
        Array.from(data.images).forEach((file) => {
          formData.append("images", file);
        });
      }

      await createProduct("/company/product", formData, token);

      reset();
      onRequestClose(); // Fechar modal após criar produto
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        console.error("Erro na requisição:", error.response.data.message);
      } else {
        console.error("Erro inesperado:", error);
      }
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      overlayClassName="modal-overlay"
      className="modal-content"
    >
      <div className="modal-header">
        <h2>Criando Novo Produto</h2>
        <button className="close-button" type="button" onClick={onRequestClose}>
          &times;
        </button>
      </div>

      <div className="modal-body">
        <form onSubmit={handleSubmit(onSubmit)} className="form-product">
          <input
            type="text"
            placeholder="Nome do produto"
            {...register("name", { required: "Nome é obrigatório" })}
            className="input-product"
          />

          <input
            type="text"
            placeholder="Categoria do produto"
            {...register("category", { required: "Categoria é obrigatória" })}
            className="input-product"
          />

          <textarea
            placeholder="Descrição do produto"
            {...register("description", {
              required: "Descrição é obrigatória",
            })}
            className="input-product"
          ></textarea>

          <input
            type="file"
            accept="image/*"
            multiple
            className="input-image"
            {...register("images", {
              required: "Selecione pelo menos uma imagem",
            })}
          />

          <div className="modal-footer">
            <button
              className="btn btn-decline"
              type="button"
              onClick={onRequestClose}
            >
              Voltar
            </button>
            <button className="btn btn-accept" type="submit">
              Criar
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}

export default ProductModal;
