const getUsers = async (req, res) => {
  return res.status(200).json("users");
};

module.exports = {
  getUsers,
};
