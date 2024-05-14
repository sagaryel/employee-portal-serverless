const { DynamoDBClient, PutItemCommand, UpdateItemCommand, DeleteItemCommand, GetItemCommand, ScanCommand } = require("@aws-sdk/client-dynamodb");
const client = new DynamoDBClient();

const autoIncreamentId = async (table, id) => {
  const params = {
    TableName: table,
    ProjectionExpression: id,
    Limit: 1000,
    ScanIndexForward: false,
  };

  try {
    const result = await client.send(new ScanCommand(params));
    console.log("Method autoIncreamentId DynamoDB Result ", id, " : ", result.Items.length);
    if (!result.Items || result.Items.length === 0) {
      return 1;
    } else {
      let incrementIdObj;
      let increamentId;
      if ("employeeId" === id) {
        console.log("Create employeeId");
        const sortedItems = result.Items.filter((item) => item.employeeId && !isNaN(item.employeeId.N));
        if (sortedItems.length > 0) {
          sortedItems.sort((a, b) => parseInt(b.employeeId.N) - parseInt(a.employeeId.N));
          incrementIdObj = sortedItems[0];
          increamentId = parseInt(incrementIdObj.employeeId.N);
        } else {
          increamentId = 0;
        }
      } else if ("assignmentId" === id) {
        console.log("Create assignmentId");
        const sortedItems = result.Items.filter((item) => item.assignmentId && !isNaN(item.assignmentId.N));
        if (sortedItems.length > 0) {
          sortedItems.sort((a, b) => parseInt(b.assignmentId.N) - parseInt(a.assignmentId.N));
          incrementIdObj = sortedItems[0];
          increamentId = parseInt(incrementIdObj.assignmentId.N);
        } else {
          increamentId = 0;
        }
      }else if("documentId" === id ){
        console.log("Create documentId");
        const sortedItems = result.Items.filter((item) => item.documentId && !isNaN(item.documentId.N));
        if (sortedItems.length > 0) {
          sortedItems.sort((a, b) => parseInt(b.documentId.N) - parseInt(a.documentId.N));
          incrementIdObj = sortedItems[0];
          increamentId = parseInt(incrementIdObj.documentId.N);
        } else {
          increamentId = 0;
        }
      }
      else if("educationId" === id ){
        console.log("Create educationId");
        const sortedItems = result.Items.filter((item) => item.educationId && !isNaN(item.educationId.N));
        if (sortedItems.length > 0) {
          sortedItems.sort((a, b) => parseInt(b.educationId.N) - parseInt(a.educationId.N));
          incrementIdObj = sortedItems[0];
          increamentId = parseInt(incrementIdObj.educationId.N);
        } else {
          increamentId = 0;
        }
      }
      else if("certificationId" === id ){
        console.log("Create certificationId");
        const sortedItems = result.Items.filter((item) => item.certificationId && !isNaN(item.certificationId.N));
        if (sortedItems.length > 0) {
          sortedItems.sort((a, b) => parseInt(b.certificationId.N) - parseInt(a.certificationId.N));
          incrementIdObj = sortedItems[0];
          increamentId = parseInt(incrementIdObj.certificationId.N);
        } else {
          increamentId = 0;
        }
      }
      const nextSerialNumber = increamentId !== null ? parseInt(increamentId) + 1 : 1;
      console.log("New Increament Id", nextSerialNumber);
      return nextSerialNumber;
    }
  } catch (error) {
    console.error("Error create new Increament id:", error);
    throw error;
  }
};

const pagination = (allItems, pageNo, pageSize) => {
  console.log("inside the pagination function");
  console.log("items length", allItems.length);

  const totalItems = allItems.length;
  const totalPages = Math.ceil(totalItems / pageSize);
  const startIndex = (pageNo - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, totalItems);

  const items = allItems.slice(startIndex, endIndex);
  return {
    items,
    totalItems,
    currentPage: pageNo,
    totalPages
  };
};


module.exports = {
  autoIncreamentId,
  pagination
};
