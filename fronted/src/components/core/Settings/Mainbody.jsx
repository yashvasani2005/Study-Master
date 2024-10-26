
import './Mainbody.css';
import Editprofile from './Editprofile';
import UpdateProfilepicture from './UpdateProfilepicture';
import ChangePassword from './ChangePassword';
import DeleteAccount from './DeleteAccount';


function Mainbody() {

  

  return (
    <div className="main_body_of_Editprofile">
      <h1 className="heading_of_setting">Edit Profile</h1>
      {/* section 1 Update the profile picture */}
   <UpdateProfilepicture/>
        {/* section 2 */}
      <Editprofile/>
      {/* swection 3 chnage the passsword */}
<ChangePassword/>

  {/* section 4 delete or remove the account */}
  <DeleteAccount/>

    </div> 
  );
}

export default Mainbody;
