
import { useSelector } from 'react-redux';
import './Myprofile.css'
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';

function Myprofile() {
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate();
    return (
        <div className='mainbodyofprofile'>
            <h1>My-profile</h1>
            <div className="firstbiopart">
                <img src={user?.image} alt={`profile-${user?.firstname}`} />
                <div>
                    <p>{user?.firstname + " " + user?.lastname}</p>
                    <p>{user?.email}</p>
                </div>
            </div>
            <IconBtn
                text="Edit"
                onclick={() => {
                    navigate("/dashboard/settings")
                }}
            />
        </div>
    )

}

export default Myprofile;
