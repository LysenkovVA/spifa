"use client";

import {
  Button,
  Card,
  Flex,
  Form,
  notification,
  Space,
  Typography,
} from "antd";
import { CloseOutlined, EditOutlined, SaveOutlined } from "@ant-design/icons";
import { useCallback, useState } from "react";
import { ProfileForm, ProfileView, User } from "@/entities/User";
import { useAppDispatch } from "@/shared/lib/StoreProvider";
import { updateUser } from "@/entities/User/model/actions/updateUser";

export interface EditableProfileCardProps {
  profile: User;
  isMyProfile: boolean;
}

const EditableProfileCard = (props: EditableProfileCardProps) => {
  const { profile, isMyProfile } = props;

  const [profileData, setProfileData] = useState(profile);
  const [isEdit, setIsEdit] = useState(false);
  const [notificationApi, contextHolder] = notification.useNotification();

  const [form] = Form.useForm();
  const dispatch = useAppDispatch();

  const onFinish = useCallback(
    async (values: User) => {
      try {
        const response = await updateUser({ ...values, id: profile.id });
        // const response = await dispatch().unwrap();
        // // upsertClientService({
        // //   client: {
        // //     ...values,
        // //     id: initialValues?.id ?? "",
        // //   },
        // // }),
        //
        if (response.isOk) {
          notificationApi.success({
            message: `Данные сохранены!`,
            closable: false,
            placement: "top",
            duration: 3,
          });
          setProfileData({ ...profileData, ...values });
          setIsEdit(false);
        } else {
          notificationApi.error({
            message: JSON.stringify(response.errorMessages),
            closable: false,
            placement: "top",
            duration: 5,
          });
        }
      } catch (error) {
        notificationApi.error({
          message: JSON.stringify(error),
          closable: false,
          placement: "top",
          duration: 5,
        });
      }
    },
    [dispatch, profile?.id, notificationApi],
  );

  const editTitleButtons = (
    <Space>
      <Button
        type={"link"}
        icon={<SaveOutlined />}
        onClick={() => form.submit()}
      >
        {"Сохранить"}
      </Button>
      <Button
        type={"link"}
        icon={<CloseOutlined />}
        onClick={() => setIsEdit(false)}
      >
        {"Отмена"}
      </Button>
    </Space>
  );

  const nonEditTitleButtons = (
    <Button
      type={"link"}
      icon={<EditOutlined />}
      onClick={() => setIsEdit(true)}
    >
      {"Редактировать"}
    </Button>
  );

  const content = isEdit ? editTitleButtons : nonEditTitleButtons;

  return (
    <>
      {contextHolder}
      <Card
        title={
          <Flex align={"center"} justify={"space-between"}>
            <Typography.Text type={"secondary"} style={{ fontSize: 16 }}>
              {isMyProfile
                ? "Мой профиль"
                : `${profileData.surname} ${profileData.name} ${profileData.patronymic}`}
            </Typography.Text>
            {isMyProfile ? content : undefined}
          </Flex>
        }
      >
        {isEdit ? (
          <ProfileForm
            initialValues={profileData}
            form={form}
            onFinish={onFinish}
          />
        ) : (
          <ProfileView profile={profileData} />
        )}
      </Card>
    </>
  );
};

export default EditableProfileCard;
