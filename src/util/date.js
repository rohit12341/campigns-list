let months = ['Jan', 'feb', 'mar', 'api', 'jun', 'jul', 'aug', 'sept', 'oct', 'nov', 'dec'];


// get date function for getting date according to time input in ms
// output - oct 2022, 6
export const getDate = (time) => {
    let date = new Date(time);
    let day = date.getDay();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    return `${month} ${year}, ${day}`;
  }

 // get time difference from current date to given date
 // output - 
 // for future date - 1 Year Ahead
 // for past date - 2 months ago 
  export const getTimeDiff = (time) => {
    let text = '';    
    let date = new Date(time);
    let current = new Date(); 

    if(date.getDate() === current.getDate() &&
    date.getMonth() === current.getMonth() &&
    date.getFullYear() === current.getFullYear()){
      return 'Today';
    }

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


  // get date status for past, future or current date
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