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
