class ConfigurationService {
  constructor(model) {
    this.model = model; //configuration page model
  }

  //id = path name
  getById(id) {
    const configuration = {};

    if (this.model[id]) {
      configuration.data = this.model[id];
      configuration.status = 200;
    }
    else {
      configuration.data = null;
      configuration.status = 404;
    }

    return configuration;
  }
}

module.exports = ConfigurationService;
