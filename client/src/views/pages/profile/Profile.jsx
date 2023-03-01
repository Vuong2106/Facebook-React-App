import "./profile.scss";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import PinterestIcon from "@mui/icons-material/Pinterest";
import TwitterIcon from "@mui/icons-material/Twitter";
import PlaceIcon from "@mui/icons-material/Place";
import LanguageIcon from "@mui/icons-material/Language";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Posts from "../../components/posts/Posts"
import {
  useMutation,
  useQueryClient,
  useQuery,
} from '@tanstack/react-query'
import { useLocation } from "react-router-dom";
import { makeRequest } from "../../../axiosClient";
import { useContext } from "react";
import { AuthContext } from './../../../context/authContext';

const Profile = () => {
  const {currentUser} = useContext(AuthContext)

  const userId =parseInt(useLocation().pathname.split('/')[2]);
  console.log(userId);
  const { isLoading, error, data } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      makeRequest.get('/users/profile/'+ userId).then((res) => {
        return res.data
      })
  })

  console.log(data);

  return (
    <div className="profile">
      <div className="images">
        <img
          src={data && data.coverPic}
          alt=""
          className="cover"
        />
        <img
          src={data && data.profilePic}
          alt=""
          className="profilePic"
        />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoToneIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <InstagramIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <TwitterIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <LinkedInIcon fontSize="large" />
            </a>
            <a href="http://facebook.com">
              <PinterestIcon fontSize="large" />
            </a>
          </div>
          <div className="center">
            <span>{data && data.name}</span>
            <div className="info">
              <div className="item">
                <PlaceIcon />
                <span>{data && data.city}</span>
              </div>
              <div className="item">
                <LanguageIcon />
                <span>{data && data.website}</span>
              </div>
            </div>
            {currentUser && userId === currentUser.id ?  <button >update</button> : <button >follow</button>}
          </div>
          <div className="right">
            <EmailOutlinedIcon />
            <MoreVertIcon />
          </div>
        </div>
      <Posts/>
      </div>
    </div>
  );
};

export default Profile;
