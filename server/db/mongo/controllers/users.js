import passport from 'passport';
import sanitizeHtml from 'sanitize-html';
import User from '../models/user';

/**
 * POST /login
 */
export function login(req, res, next) {
  // Do email and password validation for the server
  passport.authenticate('local', (authErr, user, info) => {
    if (authErr) return next(authErr);
    if (!user) {
      return res.status(401).json({ message: info.message });
    }
    // Passport exposes a login() function on req (also aliased as
    // logIn()) that can be used to establish a login session
    return req.logIn(user, (loginErr) => {
      if (loginErr) return res.status(401).json({ message: loginErr });
      return res.status(200).json({
        userName: req.user.profile.name,
        userId: req.user._id,
        message: `Welcome ${req.user.profile.name}. You have been logged in.`
      });
    });
  })(req, res, next);
}

/**
 * POST /logout
 */
export function logout(req, res) {
  req.logout();
  res.redirect('/');
}

/**
 * POST /signup
 * Create a new local account
 */
export function signUp(req, res, next) {
  const email = sanitizeHtml(req.body.email);
  const password = sanitizeHtml(req.body.password);
  const name = sanitizeHtml(req.body.name);
  const user = new User({
    email,
    password,
    profile: {
      name
    }
  });

  User.findOne({ email }, (findErr, existingUser) => {
    if (existingUser) {
      return res.status(409).json({ message: 'Account with this email address already exists!' });
    }

    return user.save((saveErr) => {
      if (saveErr) return next(saveErr);
      return req.logIn(user, (loginErr) => {
        if (loginErr) return res.status(401).json({ message: loginErr });
        return res.status(200).json({
          userName: req.user.profile.name,
          userId: req.user._id,
          message: `Welcome ${req.user.profile.name}. Your account has been created.`
        });
      });
    });
  });
}

export default {
  login,
  logout,
  signUp
};
