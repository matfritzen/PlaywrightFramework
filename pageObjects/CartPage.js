
const {expect} = require('@playwright/test');

class CartPage {

    constructor(page)
    {
        this.page = page;
        this.cartProducts = page.locator("div li").first();
        this.checkout = page.locator("text=Checkout");

    }

    async verifyProductIsDisplayed(productName)
    {
        await this.cartProducts.waitFor();
        const bool = await this.page.locator("h3:has-text('"+productName+"')").isVisible();    
        expect(bool).toBeTruthy();
    }

    async clickCheckoutBtn()
    {
        await this.checkout.click();

    }

}

module.exports = {CartPage};