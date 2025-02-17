const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type Employee {
        id: ID!
        first_name: String!
        last_name: String!
        email: String!
        designation: String
        salary: Int
        department: String
        date_of_joining: String
        employee_photo: String
    }

    type User {
        id: ID!
        username: String!
        email: String!
        password: String!
    }

    type Query {
        getAllEmployees: [Employee]
        searchEmployeeByEid(id: ID!): Employee
        searchEmployeeByDesignationOrDepartment(designation: String, department: String): [Employee]
        login(email: String!, password: String!): String  # ✅ FIXED
    }

    type Mutation {
        addEmployee(
            first_name: String!, last_name: String!, email: String!,
            designation: String, salary: Int, department: String,
            date_of_joining: String, employee_photo: String
        ): Employee

        updateEmployeeByEid(id: ID!, salary: Int, department: String): Employee

        deleteEmployee(id: ID!): Employee  # ✅ FIXED

        signup(username: String!, email: String!, password: String!): String
    }
`;

module.exports = typeDefs;
