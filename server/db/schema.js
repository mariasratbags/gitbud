// Massages neo4j search results into more convenient objects
exports.User = class User {
  constructor(user) {
    Object.assign(this, user.properties);
    this.id = user.identity.toNumber();
    if (this.ghId) {
      this.ghId = user.properties.ghId.toNumber();
    }
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