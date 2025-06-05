# Installation
``` bash
npm install promofire-js-sdk
```
# Setup
``` js
import { Promofire } from 'promofire-js-sdk';

const sdkData = {
  secret: 'YOUR_SECRET',
  appBuild: 'YOUR_APP_BUILD', // optional
  appVersion: 'YOUR_APP_VERSION', // optional
}

const customerData = {
  platform: 'YOUR_PLATFORM',
  device: 'YOUR_DEVICE',
  os: 'OS',
  appBuild: 'APP_BUILD',
  appVersion: 'APP_VERSION',
  sdkVersion: 'SDK_VERSION',
  tenantAssignedId: 'TENANT_ASSIGNED_ID', // optional
  firstName: 'FIRST_NAME', // optional
  lastName: 'LAST_NAME', // optional
  email: 'YOUR_EMAIL', // optional
  phone: 'YOUR_PHONE' // optional
}

const promofire = new Promofire(sdkData)
  .identify({
    /** optional, if not provided system would create on it's own */
    customerUserId: 'YOUR_USER_ID',
    firstName: 'FIRST_NAME', //optional
    lastName: 'LAST_NAME', //optional
    email: 'EMAIL', //optional
    phone: 'PHONE', //optional
  })
```

# Userless App Setup
``` js
import { Promofire } from 'promofire-js-sdk';

const sdkData = {
  secret: 'YOUR_SECRET',
  appBuild: 'YOUR_APP_BUILD', // optional
  appVersion: 'YOUR_APP_VERSION', // optional
}

const customerData = {
  tenantAssignedId: 'TENANT_ASSIGNED_ID', // optional
  firstName: 'FIRST_NAME', // optional
  lastName: 'LAST_NAME', // optional
  email: 'YOUR_EMAIL', // optional
  phone: 'YOUR_PHONE' // optional
}

const promofire = new Promofire(sdkData)
  .anonify();
```

# Methods

- create template
- update template
- get templates list
- get templates by id

- get codes
- get one code by value
- create one code
- create batch code
- update code
- redeem code
- get codes by template id
- get my redeemed codes
- get code redeemes owned by me
- get code redeemes redeemed by customer

- identify customer (upsert customer preset)
- delete customer
