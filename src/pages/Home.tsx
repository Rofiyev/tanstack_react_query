import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";
import { Posts } from "../components";
import { Spinner } from "react-bootstrap";
import { IResPostData } from "../interface";

export default function Home() {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["postsData"],
    queryFn: getPosts,
  });

  if (isLoading)
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    );
  if (error) return <div>An error occurred: {error.message}</div>;

  return (
    <ul>
      {posts?.map((item: IResPostData) => (
        <Posts key={item.id} post={item} />
      ))}
    </ul>
  );
}
