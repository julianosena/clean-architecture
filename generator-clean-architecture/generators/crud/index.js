const Generator = require('yeoman-generator');
const fs = require('fs');
const { JavaClassFileReader } = require('java-class-tools');
const reader = new JavaClassFileReader()

module.exports = class extends Generator {

    async prompting() {
        this.project = await this.prompt([
            {
                type: "input",
                name: "rootPath",
                message: "What is your root path project?"
            },
            {
                type : "input",
                name : "language",
                message : "What is language project?"
            },
            {
                type : "input",
                name : "pack",
                message : "What is your root package project?"
            },
            {
                type : "input",
                name : "database",
                message : "What the database are you using to crud?",
                choices : ["Postgres", "MongoDB", "MySQL"]
            },
        ]);
    };

    getProjectDomainPath() {
        var projectRootPath = this.project.rootPath
        var projectLanguage = this.project.language.toLowerCase()
        var projectRootPackage = this.project.pack.toLowerCase().replace(/\./g, "/")
        return projectRootPath + "src/main/" + projectLanguage + "/" + projectRootPackage + "/domain/"
    }

    getProjectGatewayPath() {
        var projectRootPath = this.project.rootPath
        var projectLanguage = this.project.language.toLowerCase()
        var projectRootPackage = this.project.pack.toLowerCase().replace(/\./g, "/")
        return projectRootPath + "src/main/" + projectLanguage + "/" + projectRootPackage + "/gateway/"
    }

    getProjectGatewayImplementationPath() {
        var projectRootPath = this.project.rootPath
        var projectLanguage = this.project.language.toLowerCase()
        var projectRootPackage = this.project.pack.toLowerCase().replace(/\./g, "/")
        var projectCrudDatabase = this.project.database.toLowerCase();
        return projectRootPath + "src/main/" + projectLanguage + "/" + projectRootPackage + "/gateway/database/" + projectCrudDatabase + "/"
    }

    generateGatewayExceptions() {
        const projectGatewayExceptionPath = this.getProjectGatewayPath() + "/exception"
        const rootPackage = this.project.pack
        const operations = ["Create", "Delete", "Find", "Update"]

        operations.forEach(operation => {
            this.fs.copyTpl(
                this.templatePath('gateway/exception/GatewayException.java'),
                this.destinationPath(projectGatewayExceptionPath + "/" + operation + "GatewayException.java"),
                { pack : rootPackage, operationName: operation }
            );
        })
    }

    generateGatewayInterfaces() {
        const projectDomainPath = this.getProjectDomainPath()
        fs.readdir(projectDomainPath, (e, files) => {
            const projectGatewayPath = this.getProjectGatewayPath()
            const rootPackage = this.project.pack
            const operations = ["Create", "Delete", "Find", "Update"]

            files.forEach(file => {
                const domainClassName = file.replace(".java", "")
                operations.forEach(operation => {
                    this.fs.copyTpl(
                        this.templatePath('gateway/GatewayInterface.java'),
                        this.destinationPath(projectGatewayPath + operation + domainClassName + "Gateway.java"),
                        { pack : rootPackage, operationName: operation, domainClassName: domainClassName }
                    );
                })
            })
        })
    }

    writing() {
        this.generateGatewayExceptions()
        this.generateGatewayInterfaces()
    }

}