class ConfigurationController {
  constructor(configurationService) {
    this.configurationService = configurationService;
  }

  /*
  returns:
    200 if configuration exists
    404 if configuration doesn't exists
  */
  get(req, res) {
    const configuration = this.configurationService.getById(req.params.path);
    if (configuration) {
      res.status(200).json(configuration.data);
    }
    else {
      res.status(404).json({ message: 'Configuration not found.' });
    }
  }

}

module.exports = ConfigurationController;
