let months = ['Jan', 'feb', 'mar', 'api', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];

export const getDate = (time) => {
    let date = new Date(time);
    let day = date.getDay();
    let month = months[date.getMonth()+1];
    let year = date.getFullYear();
    return `${month} ${year}, ${day}`;
  }

  export const getTimeDiff = (time) => {
    let text = '';    
    let date = new Date(time);
    let current = new Date(); 
    let isFuture = date > current ? true : false;
    let days = Math.ceil(Math.abs(date - current) / (1000 * 60 * 60 * 24));
    if(days >= 365){
      text = `${Math.round(days/365)} Year`;
    } else if(days > 31 && days < 365){
      text = `${Math.round(days/30)} Month`;
    } else if(days > 7) {
      text = `${Math.ceil(days/7)} Week`;
    } else {
      text = `${days} Days`;
    }
    return `${text} ${isFuture ? 'Ahead' : 'ago'}`;
  }


  export const DateStatus = (time) => {
    let status = '';
    let nowDate = new Date();
    let now = nowDate.getTime();
    let someDate = new Date(time);
    if(now - time < 0) status = 'future';
    else if(someDate.getDate() === nowDate.getDate() &&
    someDate.getMonth() === nowDate.getMonth() &&
    someDate.getFullYear() === nowDate.getFullYear()){
      status = 'current';
    }
    else status = 'past'; 

    return status;
  }