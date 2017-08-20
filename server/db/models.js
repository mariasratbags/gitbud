/*  
    This module massages neo4j search results 
    into more convenient objects.

    For information on the .toNumber() method, please check:
      https://github.com/neo4j/neo4j-javascript-driver#a-note-on-numbers-and-the-integer-type
    It is a workaround, provided by the driver, for dealing with  the differences
    between JS and neo4j's number representation.

    We have (perhaps riskily) assumed that our numbers will not exceed the MAX_SAFE_INTEGER.
*/

exports.User = class User {
  constructor(user, pairs) {
    this.id = user.identity.toNumber();
    this.username = user.properties.username;
    this.name = user.properties.name;
    this.avatarUrl = user.properties.avatarUrl;
    if (this.ghId) {
      this.ghId = user.properties.ghId.toNumber();
    }
    this.rating = user.properties.rating.toNumber();
    this.paired = pairs ? pairs.map(pair => pair.toNumber()) : [];
    this.language = user.properties.language;
    this.experience = user.properties.experience;
    this.description = user.properties.description;
  }
}

// Includes sensitive information (e.g. OAuthToken) that should not be sent to users
exports.ServerUser = class extends exports.User {
  constructor(user) {
    super(user)
    this.OAuthToken = user.properties.OAuthToken;
  }
}

exports.Project = class Project {
  constructor(project, pairs, interested) {
    this.id = project.identity.toNumber();
    this.project = project.properties.project;
    this.language = project.properties.language;
    this.experience = project.properties.experience;
    this.link = project.properties.link;
    this.paired = pairs ? pairs.map(pair => pair.toNumber()) : [];
    this.interested = interested;
  }
}
