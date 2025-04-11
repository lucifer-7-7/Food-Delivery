const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const supabase = require('../config/supabaseClient');

exports.register = async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields' });
    }

    const { data: existingUser } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (authError) {
      return res.status(400).json({ message: authError.message });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const { error: userError } = await supabase
      .from('users')
      .insert([
        {
          full_name: fullName,
          email,
          password: hashedPassword,
          auth_id: authData.user.id,
        },
      ]);

    if (userError) {
      return res.status(500).json({ message: userError.message });
    }

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return res.status(401).json({ message: authError.message || 'Invalid credentials' });
    }

    if (!authData.user?.confirmed_at) {
      return res.status(403).json({ message: 'Please verify your email before logging in.' });
    }

    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (userError || !userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        name: userData.full_name,
      },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: userData.id,
        email: userData.email,
        fullName: userData.full_name,
      },
    });
  } catch (error) {
    next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Please provide an email' });
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: process.env.PASSWORD_RESET_REDIRECT_URL,
    });

    if (error) {
      return res.status(400).json({ message: error.message });
    }

    res.status(200).json({ message: 'Password reset email sent' });
  } catch (error) {
    next(error);
  }
};
