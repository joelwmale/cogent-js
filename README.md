# CogentJS

## A simple and elegant way to build urls for your REST API

<a href="https://www.npmjs.com/package/cogent-js">
  <img src="https://img.shields.io/npm/v/cogent-js.svg" />
</a> 
<a href="https://travis-ci.org/joelwmale/cogent-js">
  <img src="https://travis-ci.org/joelwmale/cogent-js.svg?branch=master" />
</a>
<a href="https://github.com/joelwmale/js-elegant-api-query/blob/master/LICENSE">
  <img src="https://img.shields.io/apm/l/vim-mode.svg" />
</a>

This package helps you to quickly build urls for a REST API, using fluent syntax.

🔥 If you use laravel, the defaults of this package will work with [spatie/laravel-query-builder](https://github.com/spatie/laravel-query-builder).

# Basic usage

Make a url by calling the functions you need:

```js
// Import
const { Query } = require("cogent-js");

// If custom configuration is required, see Additional Configuration
const query = new Query();

// /posts?filter[name]=Bob&include=posts,comments&orderBy=-created_at
const url = query
  .where("name", "Bob")
  .include("posts", "comments")
  .orderBy("-created_at")
  .get();
```

# Installation

## Npm

```js
npm i cogent-js
```

## Yarn

```js
yarn add cogent-js
```

# Additional Configuration

## Base Url

You can optionally set the `base_url` property when instantiating the class to automatically preprend the url to all urls:

```js
const { Query } = require('cogent-js');

const query = new Query({
  base_url: 'http://api.example.com'
});

// http://api.example.com/users?filter[name]=Bob
const url = query.for('users').where('name', 'Bob').url()); // or .get();
```

# Available Methods

## Where

```js
// /users?filter[name]=Bob
const url = query.for('users').where('name', 'Bob').url()); // or .get();
```

## Include

```js
// /pouserssts?include=posts
const url = query.for('users').include('posts').url()); // or .get();
```

## Append

```js
// /users?append=full_name,age
const url = query.for('users').append('full_name', 'age').url()); // or .get();
```

## Select

```js
// /users?fields=name,age,date_of_birth
const url = query.for('users').select('name', 'age', 'date_of_birth').url()); // or .get();
```

## Limit

```js
// /users?limit=5
const url = query.for('users').limit(5).url()); // or .get();
```

## Pagination

```js
// /users?page=2&limit=5
const url = query.for('users').limit(5).page(2).url()); // or .get();
```

## Sort

```js
// /users?sort=-name,age
const url = query.for('users').sort('-name', 'age').url()); // or .get();
```

## Additional parameters

If required, you can also append your own parameters by passing an object to the `params` function.

```js
// /users?username=test
const url = query.for('users').params({ 'username': 'test' }).url()); // or .get();
```

# Customizing Query Parameters

If you need to change the default values for the query parameters, you can optionally pass in a configuration object when initializing your query object.

```js
const { Query } = require("cogent-js");

const query = new Query({
  queryParameters: {
    include: "include_custom",
    filter: "filter_custom",
    sort: "sort_custom",
    fields: "fields_custom",
    append: "append_custom",
    page: "page_custom",
    limit: "limit_custom"
  }
});
```

# Contributing

Please see [CONTRIBUTING](CONTRIBUTING.md) for details.

# Thanks

- Inspiration from [robsontenorio/vue-api-query](https://github.com/robsontenorio/vue-api-query).
- Credits to [spatie](https://github.com/spatie) and [spatie/laravel-query-builder](https://github.com/spatie/laravel-query-builder).

# Contact

Twitter [@joelwmale](https://twitter.com/joelwxd)
