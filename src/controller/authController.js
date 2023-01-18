const validation = require("../validation/index");
module.exports = {
  login: async (req, res, next) => {
      /*
     #swagger.tags = ['AUTH']
   */
    try {
      const { error } = validation.login(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const request = {
        email: req.body.email,
        password: req.body.password,
      };
      const user = await req.authUC.login(request);

      return res.status(200).json({ user });
    } catch (error) {
     next(error)
    }
  },
  register: async (req, res, next) => {
      /*
     #swagger.tags = ['AUTH']
   */
    try {
      const { error } = validation.register(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const request = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        phone_number: req.body.phone_number,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        gender: req.body.gender,
        image: req.file.path,
      };
      const user = await req.authUC.register(request);

      return res.status(201).json({ user });
    } catch (error) {
     next(error)
    }
  },
};
