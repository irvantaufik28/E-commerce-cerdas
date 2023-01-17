module.exports = {
  profile: async (req, res) => {
    try {
      const { id } = req.user;
      const user = await req.userUC.profile(id);

      return res.status(200).json({ user });
    } catch (error) {
      return res.status(error.status).json({ message: error.message });
    }
  },
  update: async (req, res) => {
    // try {
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
    // } catch (error) {
    //   return res.status(error.status).json({ message: error.message });
    // }
  },
};
