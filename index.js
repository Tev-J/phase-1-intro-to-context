// Your code here
function createEmployeeRecord(employeeData) {
  return {
    firstName: employeeData[0],
    familyName: employeeData[1],
    title: employeeData[2],
    payPerHour: employeeData[3],
    timeInEvents: [],
    timeOutEvents: [],
  };
}

function createEmployeeRecords(employeeDataList) {
  return employeeDataList.map((employeeData) =>
    createEmployeeRecord(employeeData)
  );
}

function createTimeInEvent(employeeRecord, dateStamp) {
  const [date, time] = dateStamp.split(" ");

  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(time),
    date: date,
  });
  return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp) {
  const [date, time] = dateStamp.split(" ");

  employeeRecord.timeOutEvents.push({
    type: "TimeOut",
    hour: parseInt(time),
    date: date,
  });
  return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
  //const [date, time] = dateStamp.split(" ");

  const timeIn = employeeRecord.timeInEvents.find((e) => e.date === date);
  const timeOut = employeeRecord.timeOutEvents.find((e) => e.date === date);

  const hoursWorked = (timeOut.hour - timeIn.hour) / 100; // need to address this logic to separate hours/mins
  return hoursWorked;
}

function wagesEarnedOnDate(employeeRecord, date) {
  return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

function allWagesFor(employeeRecord) {
  //returns pay owed for all dates
  const datesWorked = employeeRecord.timeInEvents.map((e) => e.date);
  const wagesEarned = datesWorked.reduce((total, currentdate) => {
    return total + wagesEarnedOnDate(employeeRecord, currentdate);
  }, 0);

  return wagesEarned;
}

function calculatePayroll(employeeRecords) {
  const totalWages = employeeRecords.reduce((total, employeeRecord) => {
    return total + allWagesFor(employeeRecord);
  }, 0);

  return totalWages;
}
