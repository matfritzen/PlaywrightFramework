Feature: Ecommerce validations

    @Validation @Regression
    Scenario Outline: Placing the Order
        Given a login to Ecommerce2 application with "<username>" and "<password>"
        Then Verify Error message is displayed
        Examples:
            | username                    | password |
            | matheus-fritzen@hotmail.com | learning |
            | test                        | Test@123 |