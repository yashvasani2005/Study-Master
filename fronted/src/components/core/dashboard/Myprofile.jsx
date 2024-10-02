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


            {/* Section ::::1 */}
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

            {/* Section::::2 */}

            <div className="profile-section-2">
                <div className='profile-about'>
                <p >About</p>
                <IconBtn text="Edit" onclick={() => { navigate("/dashboard/settings") }} >
                    <RiEditBoxLine />
                </IconBtn>
                </div>
              <p className='profile-addtional-details'>{user?.additionaldetails?.about ?? "Write Something about your self"}</p>

            </div>

             {/* Section 3:::: */}

             <div className="profile-personal-details">
             <div className='personal-details'>
                <p >Personal Detail</p>
                <IconBtn text="Edit" onclick={() => { navigate("/dashboard/settings") }} >
                    <RiEditBoxLine />
                </IconBtn>
                </div>
                <div className="detailscontain">
                    <div className='personal_detail_allsection'>
                           <p className='personal_detail_allsection-p1'>First Name</p>
                           <p className='personal_detail_allsection-p2'>{user?.firstname}</p>                        
                    </div>
                    <div className='personal_detail_allsection'>
                           <p className='personal_detail_allsection-p1'>Last Name</p>
                           <p className='personal_detail_allsection-p2'>{user?.lastname}</p>                        
                    </div>
                    <div className='personal_detail_allsection'>
                           <p className='personal_detail_allsection-p1'>Email</p>
                           <p className='personal_detail_allsection-p2'>{user?.email}</p>                        
                    </div>
                    <div className='personal_detail_allsection'>
                           <p className='personal_detail_allsection-p1'>Date of Birth</p>
                           <p className='personal_detail_allsection-p2'>{user?.additionaldetails?.dateofbirth ?? "Add date of birth"}</p>                        
                    </div>
                    <div className='personal_detail_allsection'>
                           <p className='personal_detail_allsection-p1'>Contact Number</p>
                           <p className='personal_detail_allsection-p2'>{user?.additionaldetails?.contactnumber ?? "Add Contact Number"}</p>                        
                    </div>
                    <div className='personal_detail_allsection'>
                           <p className='personal_detail_allsection-p1'>Gender</p>
                           <p className='personal_detail_allsection-p2'>{user?.additionaldetails?.gender ?? "Add Gender"}</p>                        
                    </div>
             </div>
             </div>
          
        </div>
    );
}

export default MYProfile;
