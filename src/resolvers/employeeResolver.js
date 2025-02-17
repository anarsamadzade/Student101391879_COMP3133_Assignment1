const Employee = require("../models/Employee");

const resolvers = {
    Query: {
        getAllEmployees: async () => await Employee.find(),
        searchEmployeeByEid: async (_, { id }) => await Employee.findById(id),
        searchEmployeeByDesignationOrDepartment: async (_, { designation, department }) => {
            return await Employee.find({ $or: [{ designation }, { department }] });
        },
    },
    Mutation: {
        addEmployee: async (_, args) => {
            try {
                console.log("Received Data:", args);
                const newEmployee = new Employee(args);
                await newEmployee.save();
                console.log("Employee Saved:", newEmployee);
                return newEmployee;
            } catch (error) {
                console.error("Error adding employee:", error);
                throw new Error("Failed to add employee");
            }
        },
        updateEmployeeByEid: async (_, { id, salary, department }) => {
            try {
                const updatedEmployee = await Employee.findByIdAndUpdate(
                    id,
                    { $set: { salary, department } },
                    { new: true }
                );
                if (!updatedEmployee) throw new Error("Employee not found");
                return updatedEmployee;
            } catch (error) {
                console.error("Error updating employee:", error);
                throw new Error("Failed to update employee");
            }
        },
        deleteEmployee: async (_, { id }) => {  // <-- ADD THIS FUNCTION
            try {
                const deletedEmployee = await Employee.findByIdAndDelete(id);
                if (!deletedEmployee) throw new Error("Employee not found");
                return deletedEmployee;
            } catch (error) {
                console.error("Error deleting employee:", error);
                throw new Error("Failed to delete employee");
            }
        },
    },
};

module.exports = resolvers;
