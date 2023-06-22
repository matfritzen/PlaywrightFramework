const {test, expect} = require('@playwright/test');

let text;

test('@API Intercepting a request and aborting',async ({browser})=>
{
    //chrome - plugins/cookies
    // the newContext() method is to open a new browser without cookes/plugins like anonymous.
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.route('**/*.{jpg,png,jpeg}', route=> route.abort()) // '**/* means any url ', abort method is to block the request to reach the browser.
    page.on('request', request=> console.log(request.url()));
    page.on('response', response=> console.log(response.url(),response.status()));
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    const username = page.locator("#username");
    const password = page.locator("[type='password']");
    const signInBtn = page.locator("#signInBtn");
    const cardTitles = page.locator(".card-body a")

    await username.type("matheus");
    await password.type("learning");
    await signInBtn.click();
    
    // console.log(await page.locator("[style*='block']").textContent());
    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await username.fill("rahulshettyacademy")
    
    await Promise.all(
        [
            page.waitForURL("https://rahulshettyacademy.com/angularpractice/shop"),
            signInBtn.click(),
        ]
        )

    // console.log(await cardTitles.first().textContent());
    // console.log(await cardTitles.nth(1).textContent());
    
    const allTitles = await cardTitles.allTextContents();
    console.log(allTitles);

});