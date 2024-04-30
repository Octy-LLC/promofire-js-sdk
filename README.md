# Installation
``` bash
npm install @octy/promofire-js-sdk
```
# Setup
``` js
import { Promofire } from '@octy/promofire-js-sdk';

const promofire = new Promofire('YOUR_TENANT', 'YOUR_SECRET')
  .identify('YOUR_CUSTOMER_ID_IN_YOUR_DB');
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
- filter codes
- get my redeemed codes
- get code redeemes owned by me
- get code redeemes redeemed by customer

- create customer (assign customer data)
- identify customer (upsert customer preset)
- delete customer
