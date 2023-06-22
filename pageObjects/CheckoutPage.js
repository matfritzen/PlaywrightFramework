class CheckoutPage
{


    constructor(page)
    {
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.username = page.locator(".user__name [type='text']");
        this.placeOrderBtn = page.locator(".action__submit");

    }

    async selectCountry(country)
    {
    await this.country.type(country, {delay:100});
    const dropdown = this.page.locator(".ta-results");
    await dropdown.waitFor();
    let optionsCount = await dropdown.locator("button").count();

    for (let i = 0; i < optionsCount; i++) {

        let text = await dropdown.locator("button").nth(i).textContent();

        if(text.trim() === "India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
        
    }
    }
    async clickPlaceOrderBtn(){
        await this.placeOrderBtn.click();
    }

}
module.exports = {CheckoutPage};