@API
Feature: Employee API Management (POST & GET)

  # POST Method
  @Positive @POST
  Scenario: [POST] Create employee success returns 201
    Given I prepare valid employee data
    When I send a POST request to "/api/v1/employees"
    Then the API response status should be 201

  @Negative @POST
  Scenario: [POST] Create employee failed - Invalid email format (400)
    Given I prepare employee data with invalid email "somsak.test.com"
    When I send a POST request to "/api/v1/employees"
    Then the API response status should be 400
    And the response body "defaultMessage" should be "must be a well-formed email address"

  # GET Method
  @Positive @GET
  Scenario: [GET] Retrieve employee by existing ID (200)
    When I send a GET request to "/api/v1/employees/1"
    Then the API response status should be 200

  @Negative @GET
  Scenario: [GET] Retrieve non-existing ID returns 404
    When I send a GET request to "/api/v1/employees/999"
    Then the API response status should be 404
    And the response body message should be "Employee not found with ID 999"