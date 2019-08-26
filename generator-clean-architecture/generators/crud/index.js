const Generator = require('yeoman-generator');
const fs = require('fs');
const { JavaClassFileReader } = require('java-class-tools');
const reader = new JavaClassFileReader()

module.exports = class extends Generator {

    async projectDomainRootPath() {
        this.project = Object.assign(await this.prompt([
            {
                type: "input",
                name: "domainRootPath",
                message: "What is project domain root path"
            }
        ]), this.project)
    };

    checkProjectDomainRootPathIsValid(){
        if(!this.project.domainRootPath) {
            this.log.error("Invalid project domain root path");
            process.exit();
        }

        if(!fs.existsSync(this.project.domainRootPath)) {
            this.log.error("Invalid project domain root path");
            process.exit();
        }
    };

    async projectProgrammingLanguagePrompting() {
        this.project = Object.assign(await this.prompt([
            {
                type: "list",
                name: "programmingLanguage",
                message: "What is project programming language?",
                choices : [
                    {
                        name : "Java",
                        value : "java",
                        checked : true
                    }
                ]
            }
        ]), this.project)
    };

    async projectGatewayRootPath() {
        this.project = Object.assign(await this.prompt([
            {
                type: "input",
                name: "gatewayRootPath",
                message: "What is project gateway root path"
            }
        ]), this.project)
    };

    checkProjectGatewayRootPathIsValid(){
        if(!this.project.gatewayRootPath) {
            this.log.error("Invalid project gateway root path");
            process.exit();
        }

        if(!fs.existsSync(this.project.gatewayRootPath)) {
            this.log.error("Invalid project gateway root path");
            process.exit();
        }
    };

    config(){
        this.project.getProjectDomainPackage = function(){
            var projectDomainPackage = this.domainRootPath.replace(/[-\/\w]+\/java\//g,"");
            projectDomainPackage = projectDomainPackage.replace(/[\/]/g, ".");
            return projectDomainPackage;
        }

        this.project.getProjectGatewayPackage = function(){
            var projectGatewayPackage = this.gatewayRootPath.replace(/[-\/\w]+\/java\//g,"");
            projectGatewayPackage = projectGatewayPackage.replace(/[\/]/g, ".");
            return projectGatewayPackage;
        }
    }

    generateGatewayExceptions() {
        console.log("Generating exceptions to gateway layer");
        const projectGatewayExceptionPath = this.project.gatewayRootPath + "/exception"
        const projectGatewayPackage = this.project.getProjectGatewayPackage();
        const operations = ["Create", "Delete", "Find", "Update"]

        operations.forEach(operation => {
            this.fs.copyTpl(
                this.templatePath('gateway/exception/GatewayException.java'),
                this.destinationPath(projectGatewayExceptionPath + "/" + operation + "GatewayException.java"),
                { gatewayPackage : projectGatewayPackage, operationName: operation }
            );
        });

        console.log("Ending generating exceptions to gateway layer");
    }

    generateGatewayInterfaces() {
        const projectDomainPath = this.project.domainRootPath
        fs.readdir(projectDomainPath, (e, files) => {
            const projectGatewayPath = this.project.gatewayRootPath;
            const projectGatewayPackage = this.project.getProjectGatewayPackage();
            const projectDomainPackage = this.project.getProjectDomainPackage();
            const operations = ["Create", "Delete", "Find", "Update"]

            files.forEach(file => {
                const domainClassName = file.replace(".java", "")
                operations.forEach(operation => {
                    this.fs.copyTpl(
                        this.templatePath('gateway/GatewayInterface.java'),
                        this.destinationPath(projectGatewayPath + "/" + operation + domainClassName + "Gateway.java"),
                        { gatewayPackage : projectGatewayPackage, domainPackage : projectDomainPackage, operationName: operation, domainClassName: domainClassName }
                    );
                })
            })
        })
    }

    generateGatewayImplementations() {
        const projectDomainPath = this.project.domainRootPath
        fs.readdir(projectDomainPath, (e, files) => {
            const projectGatewayPath = this.project.gatewayRootPath;
            const projectGatewayPackage = this.project.getProjectGatewayPackage();
            const projectDomainPackage = this.project.getProjectDomainPackage();
            const operations = ["Create", "Delete", "Find", "Update"]

            files.forEach(file => {
                const domainClassName = file.replace(".java", "")
                operations.forEach(operation => {
                    console.log(projectGatewayPath);

                    this.fs.copyTpl(
                        this.templatePath('gateway/GatewayInterface.java'),
                        this.destinationPath(projectGatewayPath + "/" + operation + domainClassName + "Gateway.java"),
                        { gatewayPackage : projectGatewayPackage, domainPackage : projectDomainPackage, operationName: operation, domainClassName: domainClassName }
                    );
                })
            })
        })
    }
}