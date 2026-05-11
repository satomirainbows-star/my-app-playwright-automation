@UI @Ecommerce
Feature: E-commerce Web Application End-to-End Validation
  As a customer, I want to complete a purchase process 
  from login to summary to ensure system integrity.

  Background: 
    Given I navigate to the login page

  # ==========================================
  # SECTION 1: POSITIVE SCENARIOS (Happy Path)
  # ==========================================

  @Positive @FullFlow
  Scenario: [Step 1-4] Complete purchase with valid data and verify address concatenation
    # Step 1: Login
    When I login with username "admin@admin.com" and password "admin123"
    Then I should be redirected to the shop page

    # Step 2: Shopping (Add multiple items & quantities)

    When I add "Dior" quantity 2 to the cart
    And I add "Gucci" quantity 3 to the cart
    Then the cart badge should display "5" items
    And the total cost should equal the sum of item prices times quantities

    # Step 3: Checkout (Fill shipping details)
    When I proceed to checkout
    And I fill shipping details:
      | field   | value         |
      | street  | 123 Sukhumvit |
      | city    | Bangkok       |
      | country | Thailand      |
    And I click "Submit Order"

    # Step 4: Summary (Verify Business Logic & String Concatenation)
    Then I should see the order success message
    And the specific address should be "123 Sukhumvit, Bangkok - Thailand"
    And the total price should be calculated correctly with 7% VAT

  # ==========================================
  # SECTION 2: NEGATIVE SCENARIOS (Error Handling)
  # ==========================================

  @Negative @Login
  Scenario: [Step 1] Login failed with invalid credentials
    When I login with username "wrong_user" and password "1234"
    Then I should see an authentication error "Bad credentials"
  @Negative @Checkout
  Scenario: [Step 3] Checkout failed due to missing required fields
    When I login with username "admin@admin.com" and password "admin123"
    And I add "Dior J'adore" quantity 1 to the cart
    And I proceed to checkout
    And I leave the "Street" field empty
    And I click "Submit Order"
    Then I should see a validation error "Street is required"

  @Negative @Inventory
  Scenario: [Step 2] Add items exceeding available stock
    When I login with username "admin@admin.com" and password "admin123"
    And I add "Dior J'adore" quantity 51 to the cart
    Then I should see a stock warning "Product is out of stock or insufficient"