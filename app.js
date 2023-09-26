const {
    DynamoDBClient,
    GetItemCommand,
    PutItemCommand,
    ScanCommand,
    UpdateItemCommand,
  } = require('@aws-sdk/client-dynamodb');
  const { marshall, unmarshall } = require('@aws-sdk/util-dynamodb');
  
  const client = new DynamoDBClient();
  
  // Regular expressions for validation
  const phoneNumberRegex = /^\d{10}$/; // Matches 10-digit phone numbers
  const emailRegex = /^[A-Za-z0-9+_.-]+@(.+)$/; // Matches email addresses
  const nameRegex = /^[A-Za-z\s]+$/; // Matches names (only letters and spaces)
  const addressRegex = /^[A-Za-z0-9\s]+$/; // Matches addresses (letters, numbers, and spaces)
  
  const validatePostData = (postData) => {
    if (
      !(
        
        postData.address &&
        postData.phone &&
        postData['personalEmail'] &&
        postData['emergencyContactPersonName'] &&
        postData['emergencyContactPersonPhone']
      )
    ) {
      throw new Error('Required fields are missing.');
    }
  
    if (!phoneNumberRegex.test(postData.phone)) {
      throw new Error('Invalid phone number.');
    }
  
    if (!emailRegex.test(postData['personalEmail'])) {
      throw new Error('Invalid email address.');
    }
  
    if (!addressRegex.test(postData.address)) {
      throw new Error('Invalid address.');
    }
  };
  
  const createEmpContact = async (event) => {
    console.log("inside the add contact method");
    const response = { statusCode: 200 };
    try {
      const body = JSON.parse(event.body);
  
      // Validate the incoming data
      validatePostData(body);
  
      const params = {
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: marshall({ employeeId: event.pathParameters.employeeId }),
        UpdateExpression: `SET ${objKeys
          .map((_, index) => `#key${index} = :value${index}`)
          .join(', ')}`,
        ExpressionAttributeNames: objKeys.reduce(
          (acc, key, index) => ({
            ...acc,
            [`#key${index}`]: key,
          }),
          {}
        ),
        ExpressionAttributeValues: marshall(
          objKeys.reduce(
            (acc, key, index) => ({
              ...acc,
              [`:value${index}`]: body[key],
            }),
            {}
          )
        ),
      };
      const createResult = await client.send(new PutItemCommand(params));
      response.body = JSON.stringify({
        message: 'Successfully created post.',
        createResult,
      });
    } catch (e) {
      console.error(e);
      response.statusCode = 500;
      response.body = JSON.stringify({
        message: 'Failed to create post.',
        errorMsg: e.message,
        errorStack: e.stack,
      });
    }
    return response;
  };
  // ... rest of your code ...
  
  module.exports = {
    createEmpContact
  };