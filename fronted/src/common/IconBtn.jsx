

import "./IconBtn.css"; 
function IconBtn(
  {
    text,
    onclick,
    children,
    disabled,
     outline=false,
     customclases,
     type,

  }
) {



  return (
           <button
           disabled={disabled}
            onClick={onclick}
            type={type}
           >
               {
                children ?
                (
                    <>
                       <span>
                        {text}
                       </span>
                       {children }
                  </>
                ):
                (text)
               }
           </button>
  );
}

export default IconBtn;
