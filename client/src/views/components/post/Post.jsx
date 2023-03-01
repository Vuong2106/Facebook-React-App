import "./post.scss";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import TextsmsOutlinedIcon from "@mui/icons-material/TextsmsOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Link } from "react-router-dom";
import Comments from "../comments/Comments";
import { useContext, useState } from "react";
import moment from 'moment';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import {
  useQuery,
} from '@tanstack/react-query'
import { makeRequest } from "../../../axiosClient";
import { AuthContext } from './../../../context/authContext';

const Post = ({ post, ...rest }) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const {currentUser} = useContext(AuthContext)
  
  //TEMPORARY
  const { isLoading, error, data } = useQuery({
    queryKey: ['likes', post.id],
    queryFn: () =>
      makeRequest.get('/likes?post_id='+ post.id).then((res) => {
        return res.data
      })
  })

  const queryClient = useQueryClient()
  const mutation = useMutation({
        mutationFn: (liked) => {
          if(liked) return makeRequest.delete('/likes?post_id='+ post.id)
          return makeRequest.post('/likes', {post_id: post.id})
        },
        onSuccess: async () => {
          // Invalidate and refetch
          await queryClient.invalidateQueries({ queryKey: ['likes'] })
        },
      })


  const handleLike = () => {
    mutation.mutate(data && data.includes(currentUser.id))
  }
  

  return (
    <div className="post">
    {/* {rest.isLoading ? "Loading..." :  */}
      <div className="container">
        <div className="user">
          <div className="userInfo">
            <img src={post.profilePic} alt="" />
            <div className="details">
              <Link
                to={`/profile/${post.userId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <span className="name">{post.name}</span>
              </Link>
              <span className="date">{moment(post.created_at).fromNow()}</span>
            </div>
          </div>
          <MoreHorizIcon />
        </div>
        <div className="content">
          <p>{post.description}</p>
          <img src={"./uploads/" + post.img} alt="" />
        </div>
        <div className="info">
          <div className="item">
            {data && data.includes(currentUser.id) ? <FavoriteOutlinedIcon style={{color:"red"}} onClick={handleLike}/> : <FavoriteBorderOutlinedIcon onClick={handleLike}/>}
            {data && data.length} Likes
          </div>
          <div className="item" onClick={() => setCommentOpen(!commentOpen)}>
            <TextsmsOutlinedIcon />
            12 Comments
          </div>
          <div className="item">
            <ShareOutlinedIcon />
            Share
          </div>
        </div>
        {commentOpen && <Comments postId={post.id}/>}
      </div>
    {/* } */}
    </div>
  );
};

export default Post;
