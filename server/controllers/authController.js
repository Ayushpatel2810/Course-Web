const User = require("../models/User");
const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  return jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
};

exports.register = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email already exists" });

    const user = new User({ email, password, role });
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await user.comparePassword(password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user);

    // ✅ Send token + role together
    res.json({
      token,
      role: user.role   // 👈👈 send this too
    });

  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

