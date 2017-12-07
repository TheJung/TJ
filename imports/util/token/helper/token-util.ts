import { Meteor } from 'meteor/meteor';

export class TokenHelper {
  /**
   * requestToken - 서버에 오브젝트를 
   */
  public requestToken(obj: Object): Object {
    Meteor.call('token.request', obj, // ~
    (err, res) => {
      if (err) {
        console.error(err);
        return;
      }

      return res;
    });

    return {};
  }

  public validateToken(token: string) {
    if (!Meteor.isServer) {
      console.error("토큰 인증은 서버에서만 할 수 있습니다.");
      return;
    }

    let validToken;

    Meteor.call('token.validate', token, (err, res) => {
      if (err) {
        console.error(err);
        return;
      }

      validToken = res;
    });

    return validToken;
  }
}