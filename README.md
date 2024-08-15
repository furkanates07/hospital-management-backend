# Hospital Managament Systems

This project is a hospital management system developed using NestJS. It provides various functionalities for doctors, patients, appointments, and administrators, with security ensured through JWT-based authentication.

## Features

### Admin

- **Register**: Create a new admin account.
- **Login**: Authenticate an admin and receive a JWT token.

### Doctor

- **Register**: Create a new doctor account (requires admin privileges).
- **List**: Retrieve a list of all doctors.
- **View**: Retrieve details of a specific doctor by ID.
- **Update**: Modify doctor details (can only be updated by admin or the doctor themselves).
- **Delete**: Remove a doctor from the system (requires admin privileges).

### Patient

- **Register**: Create a new patient account.
- **List**: Retrieve a list of all patients.
- **View**: Retrieve details of a specific patient by ID.
- **Update**: Modify patient details (can only be updated by the patient themselves or a doctor).
- **Update Conditions**: Modify patient conditions (requires doctor privileges).
- **Delete**: Remove a patient from the system.

### Appointment

- **Create**: Schedule a new appointment (can only be created by a patient).
- **List**: Retrieve a list of all appointments.
- **View by Doctor**: Retrieve appointments for a specific doctor.
- **View by Patient**: Retrieve appointments for a specific patient.
- **View**: Retrieve details of a specific appointment by ID.
- **Approve**: Approve an appointment (requires doctor privileges).
- **Reject**: Reject an appointment (requires doctor privileges).

## Installation

To set up and run the project, follow these steps:

1. **Clone the repository**

```bash
   git clone https://github.com/furkanates07/hospital-management.git
   cd hospital-management-system
```

2. **Install Project Dependencies**

Install the required Node.js packages:

```bash
   npm install
```

3. **Configure Environment Variables**

Create a .env file in the root directory of the project with the following content:

```bash
   DB_URI=mongodb://localhost:27017/hospital-db
```

4. **Start the Server**

For development mode, run:

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```

## Technologies Used

- **NestJS**: A progressive Node.js framework for building efficient, reliable, and scalable server-side applications.
- **TypeScript**: A strongly typed programming language that builds on JavaScript, providing better tooling at any scale.
- **MongoDB**: A NoSQL database used for storing application data with flexibility and scalability.
- **JWT (JSON Web Token)**: A compact, URL-safe means of representing claims to be transferred between two parties. Used for authentication and authorization.
- **Docker**: A platform for developing, shipping, and running applications in containers to ensure consistency across different environments.

## Examples

### Patient Registration

**Endpoint**: `POST http://localhost:3000/auth/patient-register`

**Request Body**:

```json
{
  "name": "Ali Veli",
  "email": "ali.veli@example.com",
  "password": "123456",
  "role": "patient",
  "phoneNumber": "1234567890",
  "dateOfBirth": "1990-01-01T00:00:00.000Z",
  "gender": "Male",
  "address": "Örnek Mah. 123. Sok. No: 45",
  "emergencyContact": null,
  "medicalHistory": ["Diabetes", "Hypertension"],
  "allergies": ["Penicillin"],
  "chronicConditions": ["Asthma"]
}
```

### Doctor Registration

**Endpoint**: `POST http://localhost:3000/auth/doctor-register`

**Description**: Registers a new doctor in the system. This endpoint is typically used by administrators to add new doctors.

**Request Body**:

```json
{
  "name": "Ayşe Yılmaz",
  "email": "ayse.yilmaz@example.com",
  "password": "securePassword123",
  "specialty": "Urology",
  "title": "Dr.",
  "yearsOfExperience": 10
}
```

### Update Patient Conditions

**Endpoint**: `PATCH http://localhost:3000/patients/{patientId}/conditions`

**Description**: Updates the medical conditions, allergies, and chronic conditions of a patient. This endpoint is accessible only to doctors.

**Request Body**:

```json
{
  "medicalHistory": ["Diabetes", "Hypertension"],
  "allergies": ["Penicillin"],
  "chronicConditions": ["Asthma"]
}
```

You can place this section under the **API Endpoints** section or wherever it fits best in your README. This provides clear examples of how to interact with your API, including the structure of request payloads for different endpoints.

## Images

- Docker
  ![Docker](/src/images/docker.png)
- MongoDB
  ![MongoDB](/src/images/mongoDB.png)
- Postman
  ![Postman](/src/images/postman.png)

## Contributing

Feel free to submit issues or pull requests if you find any bugs or want to add new features.
