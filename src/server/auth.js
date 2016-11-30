'use strict';

/**
 * This handles logins with a token.
 */

class Auth {
  /**
   * callback (err, token)
   */
  login(email, password, callback) {
    console.log('Log in',email,'with password',password);
    callback(null /* No error. */, '13254twedsf23421');
  }
}

module.exports = new Auth();