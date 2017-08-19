// Massages neo4j search results into more convenient objects
exports.User = class User {
  constructor(user) {
    Object.assign(this, user.properties);
    this.id = user.identity.toNumber();
    if (this.ghId) {
      this.ghId = user.properties.ghId.toNumber();
    }
    this.OAuthToken = user.properties.OAuthToken;
    this.rating = user.properties.rating.toNumber();
  }
}

exports.Project = class Project {
  constructor(project) {
    this.id = project.identity.toNumber();
    this.project = project.properties.project;
    this.language = project.properties.language;
    this.experience = project.properties.experience;
    this.link = project.properties.link;
  }
}

exports.ProjectInProgress = class ProjectInProgress extends exports.Project {
  constructor(project, pairs) {
    super(project);
    this.paired = pairs ? pairs.map(pair => pair.toNumber()) : pairs;
  }
}
