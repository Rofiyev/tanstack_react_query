import { Navbar } from "../components";
import { useRef, FormEvent } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api";
import { useNavigate } from "react-router-dom";

export default function CreatePost() {
  const navigate = useNavigate();
  const ref = useRef<HTMLFormElement>(null);

  const queryClient = useQueryClient();

  const { status, error, mutate } = useMutation({
    mutationFn: createPost,
    onSuccess: (newPost) => {
      queryClient.setQueryData(["posts", newPost.id], newPost);
      navigate(`/posts/${newPost.id}`);
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const current = ref.current as HTMLFormElement;

    const { title, body } = current;
    console.log(title.valueOf());
    mutate({
      title: title!.value,
      body: body!.value,
    });

    current.reset();
  };

  console.log(error, status);

  return (
    <div>
      <Navbar />
      <div className="w-50 m-auto mt-5">
        <form ref={ref} onSubmit={handleSubmit}>
          <div className="d-flex justify-content-center">
            <img
              className="mb-4"
              src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg"
              alt=""
              width="72"
              height="72"
            />
          </div>
          <h1 className="h3 mb-3 font-weight-normal text-center">
            Create Post
          </h1>
          <div
            className="d-flex flex-column mx-auto gap-2"
            style={{ width: " 70%" }}
          >
            <input
              type="text"
              name="title"
              className="form-control"
              placeholder="Title"
              required
              autoFocus
            />
            <textarea
              className="form-control"
              name="body"
              placeholder="Body"
              required
              autoFocus
            />

            <button className="btn btn-primary btn-block mt-3" type="submit">
              Sign in
            </button>
          </div>
          <p className="mt-5 mb-3 text-muted text-center">© 2023-2024</p>
        </form>
      </div>
    </div>
  );
}
