class OrderDetailsPage 
{

    constructor(page)
    {
        this.orderTitle = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    }

}
module.exports = {OrderDetailsPage};