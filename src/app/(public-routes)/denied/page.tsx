"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function DeniedPage() {
  const router = useRouter();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Доступ запрещен, необходимо авторизоваться"
      extra={
        <Button onClick={() => router.push("/")} type="primary">
          Войти
        </Button>
      }
    />
  );
}
