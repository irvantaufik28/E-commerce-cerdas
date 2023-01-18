const validation = require("../validation/index");

module.exports = {
  create: async (req, res, next) => {
    /*
   #swagger.tags = ['USERS']
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
      next(error);
    }
  },

  getAllUsers: async (req, res, next) => {
    /*
#swagger.tags = ['USERS']
*/
    try {
      const limit = parseInt(req.query.record ?? 10);
      const page = parseInt(req.query.page ?? 1);

      const params = {
        ...req.query,
        page,
        limit,
      };
      const users = await req.userUC.getAll(params);
      return res.status(200).json({ users });
    } catch (error) {
      next(error);
    }
  },

  geUserByid: async (req, res, next) => {
    /*
     #swagger.tags = ['USERS']
   */
    try {
      const { id } = req.params;
      const user = await req.userUC.geUserByid(id);

      return res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  },

  profile: async (req, res, next) => {
    /*
     #swagger.tags = ['USERS']
   */
    try {
      const { id } = req.user;
      const user = await req.userUC.profile(id);

      return res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  },
  update: async (req, res, next) => {
    /*
     #swagger.tags = ['USERS']
   */
    try {
      const { error } = validation.updateProfile(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const { id } = req.user;
      const request = {
        phone_number: req.body.phone_number,
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        address: req.body.address,
        image: req.file.path,
      };
      const user = await req.userUC.update(id, request);

      return res.status(200).json({ user });
    } catch (error) {
      next(error);
    }
  },
  deleteAccount: async (req, res, next) => {
    /*
     #swagger.tags = ['USERS']
   */
    try {
      const { id } = req.user;

      await req.userUC.deleteAccount(id);

      return res.status(200).json({ message: "succces delete" });
    } catch (error) {
      next(error);
    }
  },
  forgetPassword: async (req, res, next) => {
    /*
     #swagger.tags = ['USERS']
   */
    try {
      const { error } = validation.forgetPassworValidation(req.body);
      if (error) {
        return res.status(400).json({ message: error.message });
      }
      const request = {
        email: req.body.email,
        newPassword: req.body.newPassword,
        confirmNewPassword: req.body.confirmNewPassword,
        otp_code: req.body.otp_code,
      };
      const reset = await req.userUC.forgetPassword(request);
      return res.status(200).json(reset);
    } catch (error) {
      next(error);
    }
  },
};
