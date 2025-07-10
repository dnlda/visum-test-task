"use client";

import { LeftOutlined } from "@ant-design/icons";
import { Button, Typography, Spin } from "antd/lib";
import Link from "next/link";
import styles from "./styles.module.css";
import { useGetPostsByIdQuery } from "@/app/services/postApi";

interface PostPageProps {
  id: string;
}

export function PostPageContent({ id }: PostPageProps) {
  const { data: post, isLoading, error } = useGetPostsByIdQuery(id);

  const { Title, Paragraph, Text } = Typography;

  if (isLoading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Spin size="large" />
      </div>
    );
  if (error)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Title>Ошибка при загрузке поста</Title>
      </div>
    );

  return (
    <div className={styles.page}>
      <Title style={{ margin: 0 }}>{post?.title}</Title>
      <Paragraph>{post?.body}</Paragraph>
      <Text disabled>Автор: {post?.userName}</Text>
      <Link href="/" passHref>
        <Button type="link" icon={<LeftOutlined />}>
          Назад
        </Button>
      </Link>
    </div>
  );
}
