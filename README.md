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
  customerUserId: 'TENANT_ASSIGNED_ID',
  firstName: 'FIRST_NAME', // optional
  lastName: 'LAST_NAME', // optional
  email: 'YOUR_EMAIL', // optional
  phone: 'YOUR_PHONE' // optional
}

const promofire = new Promofire(sdkData)
  .activate(customerData);
```

# Userless App Setup
``` js
import { Promofire } from 'promofire-js-sdk';

const sdkData = {
  secret: 'YOUR_SECRET',
  appBuild: 'YOUR_APP_BUILD', // optional
  appVersion: 'YOUR_APP_VERSION', // optional
}

const promofire = new Promofire(sdkData)
  .activate();
```

# Methods

- create campaign
- update campaign
- get templates list
- get templates by id

- get available codes
- get one code by value
- create one code
- create codes batch
- update code
- redeem code
- get codes by campaign id
- get redeems of my code
- get my code redeems

- get me

- identify customer (upsert customer preset)
- delete customer
