# Installation
``` bash
npm install @octy/promofire-js-sdk
```
# Setup
``` js
import { Promofire } from '@octy/promofire-js-sdk';

const customerData = {
  platform: 'YOUR_PLATFORM',
  device: 'YOUR_DEVICE',
  os: 'OS',
  appBuild: 'APP_BUILD',
  appVersion: 'APP_VERSION',
  sdkVersion: 'SDK_VERSION'
  tenantAssignedId: 'TENANT_ASSIGNED_ID', // optional parameter
  firstName: 'FIRST_NAME', // optional parameter
  lastName: 'LAST_NAME', // optional parameter
  email: 'YOUR_EMAIL', // optional parameter
  phone: 'YOUR_PHONE' // optional parameter
}

const promofire = new Promofire('YOUR_TENANT', 'YOUR_SECRET')
const sdk = promofire.identify(customerData);
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
