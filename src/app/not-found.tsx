"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";

export default function DeniedPage() {
  const router = useRouter();

  return (
    <Result
      status="404"
      title="404"
      subTitle="Такой страницы не существует"
      extra={
        <Button onClick={() => router.push("/")} type="primary">
          Домой
        </Button>
      }
    />
  );
}
