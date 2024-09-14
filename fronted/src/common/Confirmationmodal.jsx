

import "./Confirmationmodal.css"; 
import IconBtn from "./IconBtn";





function Confirmationmodal({modalData}) {



  return (
    <div className="mainbodyofmodal">
          <div className="modaldata">
               <p>{modalData.text1}</p>
               <p>{modalData.text2}</p>
          </div>
          <div className="buttons">
                     <IconBtn
                        onclick={modalData?.btn1handler}
                        text={modalData?.btn1text}
                     />
                     <button
                       onClick={modalData?.btn2handler}
                     >
                          {modalData?.btn2text}
                     </button>
          </div>
   

    </div>
  );
}

export default Confirmationmodal;
