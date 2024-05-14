function isValidDateFormat(dateString) {
  const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
  return regex.test(dateString);
}

const validateCreateDocument = (requestBody) => {
  const {
    documentType,
    documentName,
    updateDate,
    employeeId,
   } = requestBody;

  if (!documentType || !documentName || !employeeId || !updateDate) {
    return false;
  }

  const today = new Date();
  const updateDateObj = new Date(updateDate);
  const isToday = updateDateObj.toDateString() === today.toDateString();
  if (!isValidDateFormat(updateDate) || !isToday) {
    throw new Error("updateDate must be today's date in MM/DD/YYYY format.");
  }

  return true;
};


module.exports = {
  validateCreateDocument,
};
