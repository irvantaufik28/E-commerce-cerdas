const validation = require("../validation/index");
module.exports = {
  profile: async (req, res) => {
       /*
     #swagger.tags = ['USERS']
   */
    try {
      const { id } = req.user;
      const user = await req.userUC.profile(id);

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
  update: async (req, res) => {
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
      return res.status(error.status).json({ message: error.message });
    }
  },
  deleteAccount: async (req, res) => {
      /*
     #swagger.tags = ['USERS']
   */
    try {
      const { id } = req.user;

      await req.userUC.deleteAccount(id);

      return res.status(200).json({ message: "succces delete" });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },
  forgetPassword: async (req, res) => {
      /*
     #swagger.tags = ['USERS']
   */
    try {
      const request = {
        email: req.body.email,
        newPassword: req.body.newPassword,
        confirmNewPassword: req.body.confirmNewPassword,
        otp_code: req.body.otp_code,
      };
      const reset = await req.userUC.forgetPassword(request);
      return res.status(200).json(reset);
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },
};
