import React from 'react';
import Modal from './components/Modal';
import { data } from './components/data';
import {DateStatus } from './util/date';
import TableRow from './components/tableRow';


class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      isShow : false,
      activeTab: 0,
      modalData : {},
      relData: [],
      events:[]
    }
  }

  handleModal = (status, item) => {
    // open pricing modal and set event data from modal
    this.setState({isShow:status, modalData:item});
  }

  changeTab = (i) => {
    // setting active tab index
    this.setState({activeTab:i});
  }

 componentDidMount(){

  // set data according to date in tabs when first load 

   let e = [
   {type:'Upcoming Campaigns', data:[]},
   {type:'Live Campaigns', data:[]},
   {type:'Past Campaigns', data:[]}];

   data.forEach((item, i)=>{
     // getting date status in status such as - past, future, current
     let status = DateStatus(item.createdOn);

     // puttting event in based on date status 
     if(status == 'future'){
       e[0].data.push(item);
     } else if(status == 'current'){
       e[1].data.push(item);
     } else {
       e[2].data.push(item);
     }
   })
   this.setState({events:e});

 }

 moveEvent = (val, id) => {

  // first find and remove event from current tab
  // move event in relevant data after updating date

   let oldEvents = this.state.events;
   let events = oldEvents.filter((item, idx) => idx == this.state.activeTab)[0];
   let eventData = events ? events.data : [];
   let removeOldEvent = eventData.filter((item, i)=> item.id != id);
   events.data = removeOldEvent;
   let removedEvent = eventData.filter((item, i)=> item.id == id)[0];

   let time = new Date(val).getTime();
   let status = DateStatus(time);

   removedEvent.createdOn = time;

    if(status == 'future'){
      oldEvents[0].data.push(removedEvent);
    } else if(status == 'current'){
      oldEvents[1].data.push(removedEvent);
    } else {
      oldEvents[2].data.push(removedEvent);
    }

    this.setState({event:oldEvents});
 }



render(){

  const {activeTab, isShow, modalData, events} = this.state;
  return (
    <>
    <header className="header">
    <div className="container logo">
      <img src={`${process.env.PUBLIC_URL}/assets/img/logo.png`} alt="bluestack logo" />

      <div id="google_translate_element"></div>
    </div>
    </header>
    <div className="container" >
      <h1 className="heading">Manage Campaigns</h1>
      
      <div className="tabs">
        <ul>
         {events.map((item, i)=>(
         <li 
         onClick={()=>this.changeTab(i)} 
         key={i} 
         className={`${i === activeTab && 'active'}`}>{item.type}</li>
         ))}
        </ul>
      </div>

      <div className="tab-content">
         {events.map((event, i)=>(
         (i === activeTab) && 
         (event.data.length > 0 ? 
         <div key={i} className="table">
               <table>
                 <thead>
                   <tr>
                   <th>Date</th>
                   <th>Campaign</th>
                   <th>View</th>
                   <th>Action</th>
                   </tr>
                 </thead>
                 <tbody>
                  {event.data.map((item, i)=>
                  (<TableRow key={i} moveEvent={this.moveEvent} handleModal={this.handleModal} item={item}/>))}
                 </tbody>
               </table>
          </div> : 
          <p key={i} className="msg">No Campaigns found</p>)
          ))}
      </div>

      {/* modal form see pricing */}
      {isShow && <Modal handleModal={this.handleModal} isOpen={isShow} data={modalData} />}
  </div>
  </>
  );
}
}


export default App;
