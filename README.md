# Fetch data with jsonplaceholder with tanstack-react-query


This project demonstrates how to use `tanstack-react-query` to fetch users and posts from the [jsonplaceholder](https://jsonplaceholder.typicode.com/) API.

## Requirements

- Node.js v12 or higher
- NPM or Yarn

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/Rofiyev/tanstack_react_query.git
    cd tanstack_react_query
    ```

2. Install the dependencies:
    ```bash
    npm install
    # or
    yarn install
    ```

## Usage

To start the project, run the following command:
    ```bash
    npm start
    # or
    yarn start
    ```

## Project Structure

Briefly describe the structure of your project, for example:

- `src/`
  - `api/`
    - `index.tsx`
  - `assets/`
    - `react.svg`
  - `components/`
    - `Navbar.tsx`
    - `Posts.tsx`
    - `User.tsx`
    - `index.ts`
  -  `interface`
      - `index.ts`
  -  `pages/`
      - `Create.tsx`
      - `Home.tsx`
      - `PostDetail.tsx`
      - `index.ts`
  -  `App.tsx`
  -  `index.css`
  -  `main.tsx`
  - `vite-env.d.ts`
 

## Fetching Data with React Query

In `src/api/index.ts`:

```typescript
import axios from "axios";
import { IResPostData, IResUserData } from "../interface";

export async function getUsers() {
  const { data } = await axios.get<IResUserData[]>(
    "https://jsonplaceholder.typicode.com/users"
  );
  return data;
}

export async function getUser(id: number) {
  const { data } = await axios.get<IResUserData>(
    `https://jsonplaceholder.typicode.com/users/${id}`
  );
  return data;
}

export async function getPosts() {
  const { data } = await axios.get<IResPostData[]>(
    "https://jsonplaceholder.typicode.com/posts"
  );
  return data;
}

export async function getPost(id: number) {
  const { data } = await axios.get<IResPostData>(
    `https://jsonplaceholder.typicode.com/posts/${id}`
  );
  return data;
}

export async function createPost({
  title,
  body,
}: {
  title: string;
  body: string;
}) {
  const { data } = await axios.post<IResPostData>(
    `https://jsonplaceholder.typicode.com/posts`,
    {
      title,
      body,
      userId: 1,
      id: Date.now(),
    }
  );
  return data;
}
```


## Components

In `src/component/Navbar.tsx`:

```typescript
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="container-fluid d-flex justify-content-between flex-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom box-shadow">
      <h5 className="my-0 mr-md-auto font-weight-normal">
        <Link
          to={"/"}
          style={{
            color: "inherit",
            display: "flex",
            gap: "68x",
            alignItems: "center",
            textDecoration: "none",
          }}
        >
          <img
            width={"50px"}
            height={"50px"}
            style={{ objectFit: "cover" }}
            // Your logo url
            src={***}
            alt="Logo"
          />
        </Link>
      </h5>
      <nav className="my-2 my-md-0 mr-md-3">
        <Link
          to={"/"}
          style={{ textDecoration: "none" }}
          className="p-2 text-dark fw-semibold"
        >
          Home
        </Link>
        <Link
          to={"/create"}
          style={{ textDecoration: "none" }}
          className="p-2 text-dark fw-semibold"
        >
          Create
        </Link>
      </nav>
    </div>
  );
}
```

## Interface

In `src/interface/index.ts`:

```typescript
export interface IResUserData {
  address: {
    city: string;
    geo: { lat: string; lng: string };
    street: string;
    suite: string;
    zipcode: string;
  };
  company: {
    bs: string;
    catchPhrase: string;
    name: string;
  };
  email: string;
  id: number;
  name: string;
  phone: string;
  username: string;
  website: string;
}

export interface IResPostData {
  body: string;
  id: number;
  title: string;
  userId: number;
}
```

## Pages

In `src/pages/Create.tsx`:

```typescript
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
```

In `src/pages/Home.tsx`:

```typescript
import { useQuery } from "@tanstack/react-query";
import { getPosts } from "../api";
import { Navbar, Posts } from "../components";
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
    <>
      <Navbar />
      <ul>
        {posts?.map((item: IResPostData) => (
          <Posts key={item.id} post={item} />
        ))}
      </ul>
    </>
  );
}
```

In `src/pages/PostDetail.tsx`:

```typescript
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
```

In `src/App.tsx`:

```typescript
import { Routes, Route } from "react-router-dom";
import { Home, PostDetail, CreatePost } from "./pages";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/posts/:id" element={<PostDetail />} />
      <Route path="/create" element={<CreatePost />} />
    </Routes>
  );
}
```

In `src/main.tsx`:

Here we need to wrap our main component using the `tanstack-react-query provider`! And it is very important that we give it `query-client` as the provider value!

```typescript
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      <ReactQueryDevtools />
    </QueryClientProvider>
  </React.StrictMode>
);
```
