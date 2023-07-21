Feature: Ecommerce validations

    @Regression
    Scenario: Placing the Order
        Given a login to Ecommerce application with "matheus-fritzen@hotmail.com" and "Test@123"
        When Add "zara coat 3" to Cart
        Then Verify "zara coat 3" is displayed in the Cart
        When Enter valid details and Place the Order
        Then Verify order is present in the Order History


# Put this scenario in here just to test the parallel execution. Command to execute: npx cucumber-js features/Ecommerce.feature --parallel 2  --exit 

# Command to execute and genenrate Cucumber HTML Report - npx cucumber-js features/Ecommerce.feature --parallel 2  --exit --format html:cucumber-report.html
    @Validation
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed
        Examples:
            | username                    | password |
            | matheus-fritzen@hotmail.com | learning |
            | test                        | Test@123 |
