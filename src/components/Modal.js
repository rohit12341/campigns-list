import React, { useEffect } from "react";
import { createPortal } from "react-dom";

// 'modal-root' is a sibling to 'app-root'
const modalRoot = document.getElementById("modal-root");

export default function Modal({ isOpen, handleModal, data}) {
  // element to which the modal will be rendered
  const el = document.createElement("div");

  useEffect(() => {
    // append to root when the children of Modal are mounted
    modalRoot.appendChild(el);

    // do a cleanup
    return () => {
      modalRoot.removeChild(el);
    };
  }, [el]);

  const backDrop = (e) => {
      if(e.target.id === 'modal'){
          handleModal(false);
      }
  }

  return (
    isOpen &&
    createPortal(
      <div className="modal" id="modal" onClick={backDrop}>
       <div className="modal-content">
           <div className="head">
               <img src={`${process.env.PUBLIC_URL}/assets/img/Bitmap.png`} alt="game img"/>
               <div>
                   <p>{data.name}</p>
                   <span>{data.region}</span>
               </div>
           </div>
           <h2>Pricing</h2>
           <ul className="price-list">
               <li>
                   <span className="duration">1 Week - 1 Month</span> 
                   <span className="amount">$ 100.00 </span> 
                </li>
                <li>
                   <span className="duration">6 Months</span> 
                   <span className="amount">$ 500.00 </span> 
                </li>
                <li>
                   <span className="duration">1 Year</span> 
                   <span className="amount">$ 900.00 </span> 
                </li>
           </ul>
           <div className="close-btn">
               <button onClick={()=>handleModal(false)}>Close</button>
           </div>
       </div>
      </div>,
      el
    )
  );
}