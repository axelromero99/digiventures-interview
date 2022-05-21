
/* The UserController class has two methods: login and register. 

The login method takes in a username and password and checks if the user exists in the database. If
the user exists, it returns the user object. If the user doesn't exist, it returns an error. 

The register method takes in a user object and checks if the user is already registered. If the user
is already registered, it returns an error. If the user is not registered, it creates the user in
the database and returns the user object. */
class UserController {

  constructor(UserService) {
    this.UserService = UserService;
  }

  /**
   * It takes in a username, password and remember boolean, and returns a user object if the username and password are
   * correct, or an error message if they are not. Has password encryption
   * @param req - The request object
   * @param res - the response object
   */
  async login(req, res) {
    try {

      const { username, password, remember } = req.body;

      const user = await this.UserService.getUser(username, password, (result) => {

        if (result?.success) {
          res.status(200).json({
            user: result.user,
            error: false,
            message: result.message,
            remember: remember
          });
        } else if (result.error) {
          res.status(200).json({
            error: true,
            message: result.message,
          });
        }
      });

    } catch (error) {
      console.log(error)
      res.status(500).json(
        {
          error: true,
          message: 'Internal Server Error'
        });
    }
  }

  /**
   * It checks if the user is already registered, if not, it creates the user. Has password hash comparation
   * @param req - request
   * @param res - The response object
   * @returns The user object is being returned.
   */
  async register(req, res) {
    try {
      const user = {
        fullname: req.body?.fullname,
        username: req.body?.username,
        email: req.body?.email,
        password: req.body?.password,
        country: req.body?.country === "other" ? req.body?.custom_country : req.body?.country,
      }

      const isRegistered = await this.UserService.checkIsRegistered(user.username, user.email);

      if (isRegistered) {
        res.status(200).json({
          error: true,
          message: 'Username or email are already registered.'
        });
      }
      else {
        const user_created = await this.UserService.createUser(user, res);
        if (user_created) {
          return res.status(200).json({
            error: false,
            message: "User succesfully created",
            user: user_created
          });
        } else {
          return res.status(500).json({ error: true, message: 'Internal Server Error' });
        }
      }
    } catch (error) {
      console.log(error)
      res.status(500).json({
        error: true,
        message: 'Internal Server Error'
      });
    }
  }

}

module.exports = UserController;
