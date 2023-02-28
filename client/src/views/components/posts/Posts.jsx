import Post from "../post/Post";
import "./posts.scss";
import {
  useQuery,
} from '@tanstack/react-query'
import { useState } from "react";
import { makeRequest } from "../../../axiosClient";

const Posts = () => {
  //TEMPORARY
  const { isLoading, error, data } = useQuery({
    queryKey: ['posts'],
    queryFn: () =>
      makeRequest.get('/posts').then((res) => {
        return res.data
      })
  })

  return (
  //   <div className="posts">
  //   {error ? "Something when wrong" : isLoading ? "Loading..." : data.map(post=>(
  //     <Post post={post} key={post.id}/>
  //   ))}
  //  </div>)
    <div className="posts">
    {data && data.map(post=>(
      <Post post={post} key={post.id}/>
    ))}
   </div>)

};

export default Posts;
