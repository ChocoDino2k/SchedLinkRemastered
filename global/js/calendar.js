/**
* classes to represent a calendar year
* @version December 20th, 2021
* @authors Logan Cover
**/

const MONTH_NAMES =  ['January','February','March','April','May','June','July','August','September','October','November','December'];
const MONTH_NAMES_ABR =  ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
const DAYS_OF_WEEK = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
const DAYS_OF_WEEK_ABR = ['Sun','Mon','Tues','Wed','Thur','Fri','Sat'];
const DAYS_OF_WEEK_LETTERS = ['U','M','T','W','R','F','S'];

function Day(year, month, day){
  this.year = year;
  this.month = month;
  this.day = day;
  this.date = new Date(year, month-1, day);
  this.userData = undefined;
}

Day.prototype = {
  toString: function(){
    return ((this.month < 10)? "0" + this.month: this.month + "") + "/" + ((this.day < 10)? "0" + this.day: this.day + "") + "/" + this.year;
  },
  getMonthName: function(abr){
    if(abr){
      return MONTH_NAMES_ABR[this.month-1];
    }
    return MONTH_NAMES[this.month-1];
  },
  getDayOfWeek: function(){
    return this.date.getDay();
  }
};

function Month(year, month){
  this.month = month;
  this.year = year;
  this.daysInMonth = (new Date(year, month,0)).getDate();
  this.days = [];
  for(let i =1; i < this.daysInMonth+1; i++){
    this.days.push(new Day(year, month, i));
  }
}

function Year(year){
  this.year = year;
  this.months = [];
  for(let i =1; i < 13; i++){
    this.months.push(new Month(year, i));
  }
}

function Calendar(loopYear = false){
  this.now = new Date();
  this.currentYear = this.now.getFullYear();
  this.currentMonth = this.now.getMonth() +1;
  this.years =[];
  this.loopCurrentYear = loopYear;
  for(let i = -1; i < 2; i++){
    this.years.push(new Year(this.currentYear +i));
  }
}

Calendar.prototype = {
  getFullMonth: function(m = this.currentMonth){
    let arr = [],
    month = m || this.currentMonth,
    numPrev = this.years[1].months[month-1].days[0].getDayOfWeek();

    for(let i =0; i < 42; i++){
      if(i < numPrev){
        if(month == 1){
          arr.push(this.years[(this.loopCurrentYear)? 1 : 0].months[11].days[31 - numPrev +i]);
        }else{
          arr.push(this.years[1].months[month-2].days[this.years[1].months[month-2].daysInMonth - numPrev + i]);
        }
      }else if(i < numPrev + this.years[1].months[month-1].daysInMonth){
          arr.push(this.years[1].months[month-1].days[i - numPrev]);
      }else{
        if(month == 12){
          arr.push(this.years[(this.loopCurrentYear)? 1 : 2].months[0].days[i - (numPrev + this.years[1].months[month-1].daysInMonth)]);
        }else{
          arr.push(this.years[1].months[month].days[i - (numPrev + this.years[1].months[month-1].daysInMonth)]);
        }
      }
    }
    return arr;
  },
  //only takes -1 and 1
  updateYear: function(factor){
    if(factor === 0){return false;}
    if(factor > 0){
      this.currentYear = this.years[2].year;
      this.years.shift();
      this.years.push(new Year(this.currentYear+1));
    }else{
      this.currentYear = this.years[0].year;
      this.years.pop();
      this.years.unshift(new Year(this.currentYear-1));
    }
    return true;
  },
  //only takes -1 and 1
  updateMonth: function(factor){
    if(factor === 0){return false;}
    factor /= Math.abs(factor);
    this.currentMonth += factor;
    if(this.currentMonth == 13){
      this.currentMonth = 1;
      if(!this.loopCurrentYear){
        return this.updateYear(factor);
      }
    }else if(this.currentMonth === 0){
      this.currentMonth = 12;
      if(!this.loopCurrentYear){
        return this.updateYear(factor);
      }
    }
    return false;
  }

}
