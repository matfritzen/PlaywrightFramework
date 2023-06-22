class ViewPage
{

    constructor(page)
    {
        this.orderIdDetails = page.locator(".col-text.-main");
        this.viewTitle = page.locator(".col-text.-main");
    }

}
module.exports = {ViewPage};