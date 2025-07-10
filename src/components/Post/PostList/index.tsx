"use client";

import { IPost } from "../../../model/types";
import Link from "next/link";
import { Pagination } from "antd";
import { useState } from "react";
import { List, Card, Button, Typography, Spin } from "antd/lib";
import { truncate } from "@/utils/truncate";

import styles from "./styles.module.css";
import { useGetPostsQuery } from "@/app/services/postApi";

export function PostList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { Title, Paragraph } = Typography;

  const { data: posts, isLoading, error } = useGetPostsQuery();

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
        <Title>Ошибка при загрузке списка постов</Title>
      </div>
    );

  const pageSize = 10;

  const currentPosts = posts?.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <List
        bordered
        dataSource={currentPosts}
        renderItem={(item: IPost) => (
          <List.Item>
            <Card
              style={{ width: "auto" }}
              title={
                <div className={styles.cardTitle}>
                  <Title style={{ margin: 0 }} level={5}>
                    {item.id}.
                  </Title>
                  <Title style={{ margin: 0 }} level={5}>
                    {item.title}
                  </Title>
                </div>
              }
              extra={
                <Link href={`/post/${item.id}`} passHref>
                  <Button type="link">Просмотр</Button>
                </Link>
              }
            >
              <Paragraph>{truncate(item.body, 150)}</Paragraph>
            </Card>
          </List.Item>
        )}
      />
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        <Pagination
          current={currentPage}
          total={posts?.length || 0}
          pageSize={pageSize}
          onChange={handlePageChange}
          showSizeChanger={false}
        />
      </div>
    </div>
  );
}
