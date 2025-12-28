This project follows the layered architecture pattern.
# Presentation layer
## Data Transfer Objects (DTOs)
DTOs are used to structure and standardize data exchange between Controllers and external clients.
They are categorized in two categories:
- Request DTOs: Define the expected structure of client requests.
- Response DTOs: Define the structure of responses sent back to clients.
One of the main reasons DTOs exists is to separate presentation logic from business logic. This allows
for business updates without the need to update the whole API for a simple service layer change, as it
allows for decoupling. Of course, API changes for valid reasons. These changes should be made and
communicated properly.
Be careful!
Data Transfer Objects should only be used in the Controller layer. They are contracts that the
client must follow in their requests and that the API must adhere to for its responses.


## Controllers
Controllers serve as the entry points for external interactions with your backend and are defined in
the Presentation layer. Their responsibilities include:
- Defining methods that expose API endpoints
- Validating and handling requests, including error reporting
- Delegating tasks to Services and returning responses to clients
Controllers work exclusively with Data Transfer Objects (DTOs) to manage input and output.
Be careful!
Controllers must never interact with the Data layer directly.

# Business layer
## Services
Services are the core of your backend. This is where all the logic resides. Each Service is linked to a
Repository and its Model. Their responsibilities include:
- Coordinating data retrieval and data updates
- Implementing the functionalities of the application
Tips
If you need to work with Model B in Service A, you can call Service B functions in Service A.
Be careful!
Services must never interact with DTOs. Instead, you might want to use Entities or primitive types.

## Entities
Entities represent the core business objects in the application, typically managed by Services. However, if an Entity is exactly the same as a Model (i.e., it has the same structure and is used for the
same purpose), then it is not required. In such cases, the Model itself can serve as the data carrier
for business logic and should be used directly within Services.
They are only necessary when they provide additional functionality or abstraction beyond the
database Model (for example, in aggregation or business-specific logic). If Entities are required, this
will be explicitly stated in the project specifications.

# Data layer
## Repositories
Repositories manage all database-related operations. Their purpose is to interact with the database,
performing tasks such as retrieving and saving data.
Be careful!
Repositories should not contain any business logic. They only aim at interacting with the database
and retrieving the needed data. Therefore, you must have at most one Model per Repository.
## Models
Models represent the database schema and are managed exclusively by Repositories. They provide a
structured way to map database records into objects.
Be careful!
Only Repositories and Services can use Models.


# Converters
Converters ensure the independence of each layer in a layered architecture. They are used to transform data objects from one layer’s format to another. This helps keep each layer focused on its specific
responsibilities. For example, a Converter can:
- Transform a DTO from the Presentation layer into an Entity for the Service layer
- Transform an Entity from the Service layer into a Model for the Data layer
Using Converters ensures that layers can work together without directly depending on each other’s
internal data representations. This approach simplifies maintenance and makes it easier to update
or extend the application.
Tips
Keep all data transformation logic in Converters to avoid duplicating it in Controllers, Services, or
Repositories.
Be careful!
Converters must only handle data transformation. They should not include any business logic or
validation.




## instalation backend 
database postgresql : 
- install postgresql 
- run commande "createdb recipes"
- install npm
- run "npm install" insides backend directories
- run "npm install prisma tsx @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg dotenv pg"
- check .env files with database url 
- run "npx prisma migrate dev --name init"
- run "npm start server.js"

## installation frontend
- run "npm isntall"
- run "npm run dev"

