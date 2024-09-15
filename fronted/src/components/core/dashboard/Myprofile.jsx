import { useSelector } from 'react-redux';
import './MYProfile.css';
import IconBtn from '../../../common/IconBtn';
import { useNavigate } from 'react-router-dom';
import { RiEditBoxLine } from 'react-icons/ri'; // Ensure the icon import

function MYProfile() {
    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div className='profile-container'>
            <h1 className="profile-title"> My Profile </h1>

            <div className="profile-card">

                <div className="profile-info">
                    <img src={user?.image} alt={`profile-${user?.firstname}`} className="profile-avatar" />

                    <div className="profile-text">
                        <p className="profile-name"> {user?.firstname + " " + user?.lastname} </p>
                        <p className="profile-email">{user?.email}</p>
                    </div>
                </div>

                <IconBtn text="Edit" onclick={() => { navigate("/dashboard/settings") }} >
                    <RiEditBoxLine />
                </IconBtn>
            </div>
        </div>
    );
}

export default MYProfile;
