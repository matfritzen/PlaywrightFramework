const base = require('@playwright/test');


exports.customtest = base.test.extend(
{
    testDataForOrder :  {
    "username": "matheus-fritzen@hotmail.com",
    "password" : "Test@123",
    "productName" : "zara coat 3"
    }

}
)