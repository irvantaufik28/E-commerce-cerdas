module.exports = {
  login: async (req, res, next) => {
    try {
      const request = {
        email: req.body.email,
        password: req.body.password,
      };
      const users = await req.authUC.login(request);
      
      return res.status(200).json(users);

    } catch (error) {
      return res.status(400).json({ message: error.message });
    }
  },
};
