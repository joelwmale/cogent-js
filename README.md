# Ata query

This package helps you to quickly build urls for a REST API, using fluent syntax.

# Basic usage

Make a url by creating config you need:

```js
// Import
const { Query } = require("ata-query");

// If custom configuration is required, see Additional Configuration
const query = new Query();
const params = {
  page: 3,
  limit: 10,
  include: ["currency"],
  sort: ["users", "dogs"],
  append: ["users", "dogs"],
  select: ["users", "dogs"],
  withoutConstrains: true,
  where: { "deleted_at:null": ["true"] },
  related: [{ data1: "whisky", data2: "cola", value: ["drink", "dance"] }]
};

// "http://baseUrl/path?page=3&per_page=10&include?currency&sort=users,dogs&append=users,dogs&fields=users,dogs&without_constrains=true&filter[deleted_at:null]=true&[data1][data2]=drink,dance"
const url = query({
  path,
  params,
  baseURL,
  customConfig: { limit: "per_page" }
}).get();
```

# Installation

## Npm

```js
npm i ata-query
```

## Yarn

```js
yarn add ata-query
```

# Additional Configuration

## Base Url

You can optionally set the `base_url` property when instantiating the class to automatically preprend the url to all urls:

```js
const { Query } = require("ata-query");

const query = new Query({
  base_url: "http://api.example.com"
});

// "http://baseUrl/path?page=3&per_page=10&include?currency&sort=users,dogs&append=users,dogs&fields=users,dogs&without_constrains=true&filter[deleted_at:null]=true&[data1][data2]=drink,dance"
const params = {
  page: 3,
  limit: 10,
  include: ["currency"],
  sort: ["users", "dogs"],
  append: ["users", "dogs"],
  select: ["users", "dogs"],
  withoutConstrains: true,
  where: { "deleted_at:null": ["true"] },
  related: [{ data1: "whisky", data2: "cola", value: ["drink", "dance"] }]
};
const url = query({
  path,
  params,
  baseURL,
  customConfig: { limit: "per_page" }
}).get();
```

# Available Methods

## where()

```js
// /users?filter[users]=true"
const params = {
  where: { users: ["true"] }
};
const url = query({
  path,
  params,
  baseURL
}).get();

// /users?filter[monkey]=big,small
const params = {
  where: { monkey: ["big", "small"] }
};

const url = query({
  path,
  params,
  baseURL
}).get();
```

## Related()

```js
// /users?[whisky][cola]=drink,dance
const params = {
  related: [{ data1: "whisky", data2: "cola", value: ["drink", "dance"] }]
};

// /users?[whisky][cola]=drink,dance&filter[cat][dog]=polly
const params = {
  related: [
    { data1: "whisky", data2: "cola", value: ["drink", "dance"] },
    { a: "cat", b: "dog", value: ["polly"] }
  ]
};

const url = query({
  path,
  params,
  baseURL
}).get();
```

## select()

````js

// users?fields=users,dogs
const params = {
 select: ["users", "dogs"]
};

const url = query({
  path,
  params,
  baseURL,
}).get();```


## include()

```js
// /users?include=currency
const params = {
  include: ["currency"]
};
// /users?include=currency,names
const params = {
  include: ["currency", "names"]
};

const url = query({
  path,
  params,
  baseURL,
}).get();```

## append()

```js

// /users?append=full_name,age
const params = {
  append: ["full_name", "age"]
};

const url = query({
  path,
  params,
  baseURL,
}).get();```

## limit()

```js
// /users?limit=5
const params = {
  limit: 5
};

const url = query({
  path,
  params,
  baseURL,
}).get();```

## page()

```js
// /users?page=5
const params = {
  page: 5
};

const url = query({
  path,
  params,
  baseURL,
}).get();```


## sort()

```js
const params = {
  sort: ["-users", "dogs"]
};

// /users?sort=-users,dogs
const url = query({
  path,
  params,
  baseURL,
}).get();```


# Customizing Query Parameters

If you need to change the default values for the query parameters, you can optionally pass in a configuration object when initializing your query object.

```js
const { Query } = require("cogent-js");

const query = new Query({
  customConfig: {
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
````
