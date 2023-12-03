import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getPost, getUser } from "../api";
import { Spinner } from "react-bootstrap";
import { Navbar } from "../components";

export default function PostDetail() {
  const { id } = useParams();

  const {
    status: statusPost,
    error: errorPost,
    data: post,
    isLoading: postIsLoading,
  } = useQuery({
    queryKey: ["postsData", parseInt(id!)],
    queryFn: () => getPost(+id!),
  });
  console.log(errorPost);

  const {
    status: statusUser,
    error: errorUser,
    data: user,
    isLoading: userIsLoading,
  } = useQuery({
    enabled: post?.userId != null,
    queryKey: ["users", post?.userId],
    queryFn: () => getUser(post!.userId!),
  });
  console.log(errorUser);
  console.log(user);

  if (postIsLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">Post Loading...</span>
      </Spinner>
    );
  }
  if (userIsLoading) {
    return (
      <Spinner animation="border" role="status">
        <span className="visually-hidden">User Loading...</span>
      </Spinner>
    );
  }

  return (
    <div>
      <Navbar />
      {statusPost === "success" && (
        <>
          <h4 style={{ textAlign: "center" }}>Post title</h4>
          <p style={{ textAlign: "center" }}>
            {post.title.charAt(0).toUpperCase() + post.title.slice(1)}
          </p>
          <p>{post.body.charAt(0).toUpperCase() + post.title.slice(1)}</p>
        </>
      )}
      <hr />
      {statusUser === "success" && (
        <div style={{ display: "flex", gap: "1rem" }}>
          <div>
            <p>
              <b>Fullname:</b> {user.name}
            </p>
            <p>
              <b>Phone number:</b> {user.phone}
            </p>
            <p>
              <b>Email:</b> {user.email}
            </p>
          </div>
          <div>
            <p>
              <b>Company:</b> {user.company.name}
            </p>
            <p>
              <b>Address:</b> {user.address.city}
            </p>
            <p>
              <b>Website:</b>{" "}
              <a target="_blank" href={`$https://${user.website}`}>
                {user.website}
              </a>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
