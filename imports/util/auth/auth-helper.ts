import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';

export class AuthHelper {
  private isLoggedIn: Boolean = false;

  /**
   * login - 서버에 로그인을 요청합니다. 로그인에 성공하면 인증용 jwt 토큰을 반환합니다.
   * 
   * @param id - 사용자 지정 가능한 ID 값입니다.
   * 
   * @param password - 평문의 비밀번호 입니다. 서버에서 암호화 해 비교합니다.
   * 
   * @param failed - 로그인에 실패했을 때 호출 되는 콜백 함수입니다. err 객체를 인자로 갖습니다.
   */
  public async login(id: string, password: string, failed?: Function): Promise<string> {
    let request: Promise<string> = new Promise((resolve, reject) => {
      // id: string, password: string
      Meteor.call('user.login', id, password, (err, res) => {
          if (err !== undefined) {
            reject(err);
          }

          resolve(res);
      });
    });

    return request;
  }

  /**
   * register - 서버에 계정 생성을 요청합니다. 만들어진 계정의 unique id를 반환합니다.
   * 
   * @param id - 사용자 지정 가능한 ID 값입니다.
   * 
   * @param password - 평문의 사용자 지정 가능한 비밀번호 값입니다. 저장될 때 암호화 됩니다.
   * 
   * @param nick - 사용자 지정 가능한 사용자 별명 입니다.
   */
  public register(id: string, password: string, nick: string): Mongo.ObjectID {
    let result: Mongo.ObjectID;

    // id: string, pw: string, nick: string
    Meteor.call('user.register', id, password, nick, (err, res: Mongo.ObjectID) => {
      if (err) {
        console.error(err);

        return;
      }

      result = res;
    });

    return result;
  }

  /**
   * reauth - 토큰의 _id를 서버에 검색하도록 요청하여 결과값이 있다면 새로운 토큰을 반환합니다.
   * 
   * @param token - 서버로부터 받은 인증용 토큰입니다.
   * 
   * @param password - _id에 해당하는 계정의 평문으로 이루어진 비밀번호 입니다.
   */
  public reauth(token: string, password: string): string {
    let result;

    Meteor.call('user.reauth', token, password, (err, res: string) => {
      if (err) {
        console.error(err);

        return;
      }

      result = res;
    });

    return result;
  }
}