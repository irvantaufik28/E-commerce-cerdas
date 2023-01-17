module.exports = {
  login: async (req, res) => {
    try {
      const dataUser = {
        email: req.body.email,
        password: req.body.password,
      };
      const users = await req.authUC.login(dataUser);
      
      return res.status(200).json({ users });

    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },
};
