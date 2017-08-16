// Massages neo4j search results into more convenient objects
exports.User = class User {
  constructor(user) {
    this.id = user.identity.toNumber();
    this.name = user.properties.name;
    this.rating = user.properties.rating.toNumber();
  }
}

exports.Project = class Project {
  constructor(project) {
    this.id = project.identity.toNumber();
    this.project = project.properties.project;
    this.language = project.properties.language;
    this.experience = project.properties.experience;
  }
}