### Restivus Man
Postman Streamlines the Development Process and Simplifies APIs.

![Screenshot of Restivus Man](http://g.recordit.co/zxTS0PDQzQ.gif)

## Install
    meteor install yasaricli:restivus-man

## Client

``` javascript
import { RestivusManClient } from 'meteor/yasaricli:restivus-man';

new RestivusManClient();
```

## Server

``` javascript
import { RestivusManServer } from 'meteor/yasaricli:restivus-man';

# Api --> Global API configuration Object 
new RestivusManServer(Api, { });
```
