import "./share.scss";
import Image from "../../../assets/img.png";
import Map from "../../../assets/map.png";
import Friend from "../../../assets/friend.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../../context/authContext";
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'
import { makeRequest } from "../../../axiosClient";

const Share = () => {
  const {currentUser} = useContext(AuthContext)
  const [file, setFile] = useState(null)
  const [description, setDescription] = useState('')
  const queryClient = useQueryClient()
  const mutation = useMutation({
        mutationFn: (newPost) => {
          makeRequest.post('/posts/addPost', newPost)
        },
        onSuccess: () => {
          // Invalidate and refetch
          queryClient.invalidateQueries({ queryKey: ['posts'] })
        },
      })
  const handleShare = async (e) => {
    e.preventDefault();
    let imgUrl = "";
    if(file) imgUrl = await upload();
    console.log(imgUrl);
    mutation.mutate({description, img:imgUrl});
    setDescription("")
    setFile(null)
  } 

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/uploads", formData);
      console.log("res", res.data);
      return res.data
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="share">
      <div className="container">
        <div className="top">
          <div className="left">
            <img
              src={currentUser.profilePic}
              alt=""
            />
            <input type="text" placeholder={`What's on your mind ${currentUser.name}?`} 
              onChange={(e) => setDescription(e.target.value)}
              value = {description}
            />
          </div>
          
        </div>
        <div className="right">
          {file && <img className="file" alt="" src={URL.createObjectURL(file)} />}
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <input type="file" id="file" style={{display:"none"}} onChange={(e) => setFile(e.target.files[0])}/>
            <label htmlFor="file">
              <div className="item">
                <img src={Image} alt="" />
                <span>Add Image</span>
              </div>
            </label>
            <div className="item">
              <img src={Map} alt="" />
              <span>Add Place</span>
            </div>
            <div className="item">
              <img src={Friend} alt="" />
              <span>Tag Friends</span>
            </div>
          </div>
          <div className="right">
            <button onClick={handleShare}>Share</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Share;
