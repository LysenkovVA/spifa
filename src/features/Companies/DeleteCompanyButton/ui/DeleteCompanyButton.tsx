"use client";

import { useCallback, useState } from "react";
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import { Button, Modal } from "antd";
import { deleteCompanyService } from "@/entities/Company";
import { DeleteOutlined } from "@ant-design/icons";

export interface DeleteCompanyButtonProps {
  companyId: string;
}

const DeleteCompanyButton = (props: DeleteCompanyButtonProps) => {
  const { companyId } = props;

  const [modalOpen, setModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const onOk = useCallback(() => {
    dispatch(deleteCompanyService({ companyId }));
  }, [companyId, dispatch]);

  return (
    <>
      <Button
        type={"default"}
        icon={<DeleteOutlined style={{ color: "red" }} />}
        onClick={() => setModalOpen(true)}
      />
      <Modal
        title="Удаление компании"
        centered
        open={modalOpen}
        onOk={() => {
          setModalOpen(false);
          onOk();
        }}
        onCancel={() => setModalOpen(false)}
      >
        <p>Вы действительно хотите удалить компанию?</p>
      </Modal>
    </>
  );
};

export default DeleteCompanyButton;
