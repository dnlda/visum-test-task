export default async function PostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const postResponse = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );

  const { title, body, userId } = await postResponse.json();

  const userResponse = await fetch(
    `https://jsonplaceholder.typicode.com/users/${userId}`
  );

  const { name } = await userResponse.json();

  return (
    <div>
      <a href={"/"}>Назад</a>
      <div>{title}</div>
      <div>{body}</div>
      <div>{name}</div>
    </div>
  );
}
