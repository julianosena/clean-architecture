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

  async projectUseCaseRootPath() {
    this.project = Object.assign(await this.prompt([
        {
            type: "input",
            name: "useCaseRootPath",
            message: "What is project use case root path"
        }
    ]), this.project)
  };

  checkProjectUseCaseRootPathIsValid(){
    if(!this.project.useCaseRootPath) {
        this.log.error("Invalid project use case root path");
        process.exit();
    }

    if(!fs.existsSync(this.project.useCaseRootPath)) {
        this.log.error("Invalid project use case root path");
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

  async projectRootPackage() {
    this.project = Object.assign(await this.prompt([
        {
            type: "input",
            name: "rootPackage",
            message: "What is root package of project"
        }
    ]), this.project)
  };

  config(){
    this.project.getProjectDomainPackage = function(){
        var projectDomainPackage = this.domainRootPath.replace(/[-\/\w]+\/java\//g,"");
        projectDomainPackage = projectDomainPackage.replace(/[\/-\\]/g, ".");
        return projectDomainPackage;
    }
  }

  generateUseCaseImplementations() {
    const projectDomainPath = this.project.domainRootPath;
    fs.readdir(projectDomainPath, (e, files) => {
        const projectUseCasePath = this.project.useCaseRootPath;
        const projectRootPackage = this.project.projectRootPackage;
        const projectDomainPackage = this.project.getProjectDomainPackage();

        const operations = ["Create", "Delete", "Find", "Update"]

        files.forEach(file => {
            const domainClassName = file.replace(".java", "")
            operations.forEach(operation => {
                console.log(operation);
                this.fs.copyTpl(
                    this.templatePath('UseCase.java'),
                    this.destinationPath(projectUseCasePath + "/" + operation + domainClassName + "UseCase.java"),
                    { rootPackage : projectRootPackage, domainPackage : projectDomainPackage, operationName: operation, domainClassName: domainClassName }
                );
            })
        })
    })
  }

}