function createEmployeeRecord([firstName, familyName, title, payPerHour]) {
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(employeeData) {
    return employeeData.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employee.timeInEvents.push({
      type: "TimeIn",
      hour: parseInt(hour, 10),
      date
    });
  
    return employee;
  }
  
  function createTimeOutEvent(employee, dateStamp) {
    const [date, hour] = dateStamp.split(' ');
  
    employee.timeOutEvents.push({
      type: "TimeOut",
      hour: parseInt(hour, 10),
      date
    });
  
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    const timeIn = employee.timeInEvents.find(event => event.date === date);
    const timeOut = employee.timeOutEvents.find(event => event.date === date);
  
    if (timeIn && timeOut) {
      return (timeOut.hour - timeIn.hour) / 100;
    } else {
      return 0;
    }
  }
  
  function wagesEarnedOnDate(employee, date) {
    const hours = hoursWorkedOnDate(employee, date);
    return hours * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    const dates = employee.timeInEvents.map(event => event.date);
    const wages = dates.reduce((total, date) => {
      return total + wagesEarnedOnDate(employee, date);
    }, 0);
  
    return wages;
  }
  
  function findEmployeeByFirstName(srcArray, firstName) {
    return srcArray.find(employee => employee.firstName === firstName);
  }
  
  function calculatePayroll(employeeRecords) {
    return employeeRecords.reduce((total, employee) => {
      return total + allWagesFor(employee);
    }, 0);
  }
  