const { Given, When, Then } = require('@cucumber/cucumber');
const { expect } = require('@playwright/test');
const apiClient = require('../../utils/api/apiClient');

// =========================
// PREPARE REQUEST BODY
// =========================

Given(
  'I prepare valid employee data',
  function () {

    // create valid payload
    this.requestBody = {
      firstName: 'Somsak',
      lastName: 'Jaidee',
      email: 'somsak@test.com',
      phoneNumber: '0812345678',
      salary: 50000
    };
  }
);

Given(
  'I prepare employee data with invalid email {string}',
  function (invalidEmail) {

    // create invalid email payload
    this.requestBody = {
      firstName: 'Somsak',
      lastName: 'Jaidee',
      email: invalidEmail,
      phoneNumber: '0812345678',
      salary: 50000
    };
  }
);

// =========================
// HTTP REQUESTS
// =========================

When(
  'I send a POST request to {string}',
  async function (endpoint) {

    try {

      // send POST request
      this.response =
        await apiClient.post(
          endpoint,
          this.requestBody
        );

    } catch (error) {

      // store error response
      this.response =
        error.response;
    }
  }
);

When(
  'I send a GET request to {string}',
  async function (endpoint) {

    try {

      // send GET request
      this.response =
        await apiClient.get(endpoint);

    } catch (error) {

      // store error response
      this.response =
        error.response;
    }
  }
);

// =========================
// STATUS CODE VALIDATION
// =========================

Then(
  'the API response status should be {int}',
  function (expectedStatus) {

    expect(this.response.status)
      .toBe(expectedStatus);
  }
);

// =========================
// RESPONSE BODY VALIDATION
// =========================

Then(
  'the response body {string} should be {string}',
  function (fieldName, expectedValue) {

    let actualValue;

    // =========================
    // SUPPORT NESTED ERRORS
    // =========================

    if (this.response.data.errors) {

      actualValue =
        this.response.data.errors[0][fieldName];

    } else if (this.response.data.messages) {

      actualValue =
        this.response.data.messages[0][fieldName];

    } else {

      actualValue =
        this.response.data[fieldName];
    }

    expect(actualValue)
      .toBe(expectedValue);
  }
);

Then(
  'the response body message should be {string}',
  function (expectedMessage) {

    let actualMessage;

    // =========================
    // SUPPORT MULTIPLE STRUCTURES
    // =========================

    if (this.response.data.message) {

      actualMessage =
        this.response.data.message;

    } else if (this.response.data.error) {

      actualMessage =
        this.response.data.error;

    } else {

      actualMessage =
        JSON.stringify(this.response.data);
    }

    expect(actualMessage)
      .toContain(expectedMessage);
  }
);
