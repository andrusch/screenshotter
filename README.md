# Simple Screenshot Service

This project is a simple API to create screenshots of the URL passed in using Puppeteer.

## API Routes

### GET /health

Returns a 200 if the service is up and healthy.

### GET /screenshot

#### Query Parameters
| Parameter   | Type | Description |
| ----------- | ----------- | ----------- |
| url      | string       | The url to navigate to and screenshot.     |
| width       | int        | The width of the viewport to take the screenshot.        |
| height      | int        | The height of the viewport to take the screenshot.        |
