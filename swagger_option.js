const swagger_options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Library API",
      version: "0.1.0",
      description:
        "API documentation for Library API"
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./src/routers/*.js"],
};

module.exports = swagger_options;