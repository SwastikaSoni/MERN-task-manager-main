
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.status(200).json({ user, status: true, msg: "Profile found successfully.." });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: "Internal Server Error" });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const allUsers = await User.find().select('-password');
    res.status(200).json({ users: allUsers, status: true, msg: 'All user profiles retrieved successfully.' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ status: false, msg: 'Internal Server Error' });
  }
};
