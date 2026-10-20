const assert = require('assert');
const { expect } = require('chai');

describe('API Automation Reqres', function () {
  let token;

  // 1a. POST Login
  it('POST Login - should login successfully', async function () {
    const response = await fetch('https://reqres.in/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1'
      },
      body: JSON.stringify({
        email: 'eve.holt@reqres.in',
        password: 'cityslicka'
      })
    });
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    expect(data).to.have.property('token');

    token = data.token;
  });

  // 1b. GET User
  it('GET User - should fetch user details', async function () {
    const response = await fetch('https://reqres.in/api/users/2', {
      headers: {
        'x-api-key': 'reqres-free-v1',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzkyMTkxMDkwLCJleHAiOjE3OTIxOTQ2OTB9.Ltckf7iu3TeT_aiDABGJT4vdWYwEoR0WvyjPCBEl3j0'
      }
    });
    const data = await response.json();

    assert.strictEqual(response.status, 200);
    assert.strictEqual(data.data.email, 'janet.weaver@reqres.in');
  });

  // 1c. POST Add User - positive case
  it('POST Add User - should create new user (positive)', async function () {
    const response = await fetch('https://reqres.in/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzkyMTkxMDkwLCJleHAiOjE3OTIxOTQ2OTB9.Ltckf7iu3TeT_aiDABGJT4vdWYwEoR0WvyjPCBEl3j0'
      },
      body: JSON.stringify({
        name: 'Indra',
        job: 'QA Engineer'
      })
    });
    const data = await response.json();

    assert.strictEqual(response.status, 201);
    assert.strictEqual(data.name, 'Indra');
  });

  // 1c. POST Add User - negative case
  it('POST Add User - should fail without password (negative)', async function () {
    const response = await fetch('https://reqres.in/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': 'reqres-free-v1',
        'token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwiaWF0IjoxNzkyMTkxMDkwLCJleHAiOjE3OTIxOTQ2OTB9.Ltckf7iu3TeT_aiDABGJT4vdWYwEoR0WvyjPCBEl3j0'
      },
      body: JSON.stringify({
        email: 'sydney@fife'
      })
    });
    const data = await response.json();

    assert.strictEqual(response.status, 400);
    assert.strictEqual(data.error, 'Missing password');
  });
});