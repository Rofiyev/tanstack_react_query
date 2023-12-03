import { IResPostData } from "../interface";
import { Link } from "react-router-dom";

export default function Posts({ post }: { post: IResPostData }) {
  return (
    <li>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  );
}
