# Amfory

HTTP client for Browser, Node.js and React Native

> :warning: Currently, the library is not production ready. The API may change at any time.

## Features

### Configuration

- Creating multiple client instances for a specific URI;
- Sharing a basic configuration for different instances;

### Interceptors

Intended to modify inquiry/reply at specific stages (inquiry, retry, reply).

- Using for all or specific inquiries;
- Flexible modification of URI (params, path, etc) and Headers;
- Storing data for a specific inquiry in key-value format;

### Plugins

Intended to extend the library functionality.

- Using for all or specific inquiries;
- Creating an instance per each inquiry;
- Availability of initialization and termination stages;

### Inquiries

- Setting headers with constant values for all inquiries;
- Retry after a specific error or a specific reply status according to a specific retry control;
- Delay before retry according to a specific delay scheme;
- Rejection after a specific time regardless of the number of retries;
- Setting rejection delay for all or specific inquiries;
- Rejection an attempt after a specific time;
- Setting attempt rejection delay for all or specific inquiries;
- Manual abort;
- Using custom payloads to serialize data and to set specific headers, such as content type, etc. Built-in payloads: ArrayBuffer, Blob, FormData, Json, Text;
- Using custom reply body readers to deserialize the body into a specific format. Built-in readers: ArrayBuffer, Blob, FormData, Json, Text;

### Logging

- Using custom loggers

## Usage

Check out the static [sample](package/amfory/sample/basic/src/index.ts)

## Plugins

[jwt-amfory-plugin](package/jwt-amfory-plugin) - Transmit and automatically refresh JWT
