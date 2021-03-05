import React, { useState, useEffect } from 'react';
import { getDate, getTimeDiff } from '../util/date';


const TableRow = ({item, handleModal, moveEvent}) => {
  const [openCal, setCal] = useState(false);
  const [date, setDate] = useState('');

  const ref = React.createRef();

  const handleDateChange = (e, id) => {
    setDate(e.target.value);
    moveEvent(e.target.value, id);
    setCal(false); 
  }

  const OpenDataFiled = (e) => {
      setCal(true);
  }
  

  useEffect(() => {
    /**
     * hide date filed clicked on outside of element
     */
    function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setCal(false);;
        }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
    };
}, [ref]);



  return (
    <tr>
        <td>
          <p className="date"> {getDate(item.createdOn)}</p>
          <span className="text">{getTimeDiff(item.createdOn)}</span>
        </td>
        <td>
            <div className="camp">
              <div className="img"><img src="/assets/img/Bitmap.png" alt="camp"/> </div>
              <div><p>{item.name}</p><span>{item.region}</span></div>
          </div>
          </td>
        <td>
          <div className="view">
            <img src="/assets/img/Price.png" alt="pricing"/>
            <span onClick={()=>handleModal(true, item)}>View Pricing</span>
          </div>
        </td>
        <td>
        <div className="action">
          <div className="item file">
            <img src="/assets/img/file.png" alt="pricing"/>
            <span>CSV</span>
            </div>
            <div className="item">
            <img src="/assets/img/statistics-report.png" alt="pricing"/>
            <span>Report</span>
            </div>
            <div ref={ref} onClick={OpenDataFiled} className="item date">
            <img src="/assets/img/calendar.png" alt="pricing"/>
            <span>Schedule Again</span>
            {openCal && <input type="date" value={date} onChange={(e)=>handleDateChange(e, item.id)} /> }
            </div>
          </div>
          </td> 
        </tr>
  )
}


export default TableRow;