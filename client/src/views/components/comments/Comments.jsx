import { useContext, useState } from "react";
import "./comments.scss";
import { AuthContext } from "../../../context/authContext";
import {
  useQuery,
} from '@tanstack/react-query'
import { makeRequest } from "../../../axiosClient";
import moment from "moment"
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

const Comments = ({postId}) => {
  const { currentUser } = useContext(AuthContext);
  const [comment, setComment] = useState('');
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationFn: (newComment) => {
      makeRequest.post('/comments/create-comments', newComment)
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ['comments'] })
    }
  })
  
  const { isLoading, error, data } = useQuery({
    queryKey: ['comments'],
    queryFn: () =>
      makeRequest.get('/comments?post_id='+postId).then((res) => {
        return res.data
      })
  })

  const handleComments = async (e) => {
    e.preventDefault();
    mutation.mutate({comment, postId} );
    setComment('')

  }
  //Temporary
  // const comments = [
  //   {
  //     id: 1,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam. Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "John Doe",
  //     userId: 1,
  //     profilePicture:
  //       "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   },
  //   {
  //     id: 2,
  //     desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem nequeaspernatur ullam aperiam",
  //     name: "Jane Doe",
  //     userId: 2,
  //     profilePicture:
  //       "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=1600",
  //   },
  // ];


  return (
    <div className="comments">
      <div className="write">
        <img src={currentUser.profilePic} alt="" />
        <input type="text" placeholder="write a comment" value={comment} onChange={(e) => setComment(e.target.value)} />
        <button onClick={handleComments}>Send</button>
      </div>
      {isLoading ? 
      "Loading..." : 
      data && data.map((comment, index) => (
        <div className="comment" key={index}>
          <img src={comment.profilePic} alt="" />
          <div className="info">
            <span>{comment.name}</span>
            <p>{comment.description}</p>
          </div>
          <span className="date">{moment(comment.created_at).fromNow()}</span>
        </div>
      ))}
    </div>
  );
};

export default Comments;
