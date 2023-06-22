// const {test,expect} = require('@playwright/test')

// // test.describe.configure({mode:'parallel'});
// test.describe.configure({mode:'serial'}); // If tests are dependent, to run from the first to the last test one by one, if the first fail, the other tests will be skipped

// test("@Web Popup validations", async({page}) =>
// {
//     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

//     await expect(page.locator("#displayed-text")).toBeVisible();
//     await page.locator("#hide-textbox").click();
//     await expect(page.locator("#displayed-text")).toBeHidden();

//     await page.locator("#confirmbtn").click();
//     page.on("dialog", dialog => dialog.accept());

//     await page.locator("#mousehover").hover();

//     const framesPage = page.frameLocator("#courses-iframe");
//     await framesPage.locator("li a[href*='lifetime-access']:visible").click();
//     const textCheck = await framesPage.locator(".text h2").textContent();
//     console.log(textCheck.split(" ")[1]);


// })


// test("@Web Screenshot & Visual Comparison", async ({page}) => {

//     await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

//     await expect(page.locator("#displayed-text")).toBeVisible();
//     await page.locator('#displayed-text').screenshot({path:'elementScreenshot.png'}) // screenshot of the element
//     await page.locator("#hide-textbox").click();
//     await page.screenshot() // screenshot of the entire page
//     await page.screenshot({path:'screenshot.png'});

//     await expect(page.locator("#displayed-text")).toBeHidden();
    
// })

// test('@Web Visual Testing - Comparing Images', async({page}) => {

//     await page.goto('https://flightaware.com/');

//     expect(await page.screenshot()).toMatchSnapshot('landing.png'); // As the flight aware webiste have the hours updating in your site, when you try to run in different time it will compare both images and fail the test.


// })
