"use client";

import { Button, Card, Flex, Space, Typography } from "antd";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useState } from "react";
import { ProfileForm, ProfileView } from "@/entities/User";

const EditableProfileCard = () => {
  const [isEdit, setIsEdit] = useState(false);

  const editTitleButtons = (
    <Space>
      <Button
        type={"link"}
        icon={<SaveOutlined />}
        onClick={() => setIsEdit(!isEdit)}
      >
        {"Сохранить"}
      </Button>
      <Button
        type={"link"}
        icon={<CloseOutlined />}
        onClick={() => setIsEdit(!isEdit)}
      >
        {"Отмена"}
      </Button>
    </Space>
  );

  const nonEditTitleButtons = (
    <Button
      type={"link"}
      icon={<EditOutlined />}
      onClick={() => setIsEdit(!isEdit)}
    >
      {"Редактировать"}
    </Button>
  );

  return (
    <Card
      title={
        <Flex align={"center"} justify={"space-between"}>
          <Typography.Text>{"Мой профиль"}</Typography.Text>
          {/*{isEdit ? editTitleButtons : nonEditTitleButtons}*/}
        </Flex>
      }
    >
      {isEdit ? <ProfileForm /> : <ProfileView />}
    </Card>
  );
};

export default EditableProfileCard;
