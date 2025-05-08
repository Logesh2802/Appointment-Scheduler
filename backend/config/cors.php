<?php

return [

'paths' => ['api/*', 'sanctum/csrf-cookie'],

'allowed_methods' => ['POST,GET,PUT,DELETE'],

'allowed_origins' => ['*'], // For dev only; restrict in production

'allowed_origins_patterns' => [],

'allowed_headers' => ['*'],

'exposed_headers' => [],

'max_age' => 0,

'supports_credentials' => false,

];
