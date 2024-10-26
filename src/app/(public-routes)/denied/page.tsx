"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function DeniedPage() {
  const router = useRouter();

  return (
    <Result
      status="403"
      title="403"
      subTitle="Доступ запрещен!"
      extra={
        <Button onClick={() => router.back()} type="primary">
          Назад
        </Button>
      }
    />
  );
}
