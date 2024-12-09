import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Books API',
      version: '1.0.0',
      description: `The Books API allows users to manage and interact with a collection of books in the system. It provides endpoints for performing CRUD operations such as retrieving, creating, updating, and deleting books. The API supports role-based access control, ensuring that only authorized users (e.g., admins and regular users) can perform specific actions. Users can also manage their favorite books, and authentication is handled via JSON Web Tokens (JWT). The API is designed for book-related operations, with endpoints that facilitate book management, user interaction, and data security.`,
    },
    servers: [
      {
        url: process.env.BACKEND_URL_PROD,
      },
      {
        url: process.env.BACKEND_URL_DEV,
      },
    ],
    components: {
      schemas: {}, // You can leave this empty as it's defined in YAML
    },
  },
  apis: [
    './src/swagger/*.yaml',
    './src/**/*.{route,routes,controller,entity,dto}.ts',
  ],
};

const specs = swaggerJsdoc(options);

export function setupSwagger(app: Express): void {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
}
