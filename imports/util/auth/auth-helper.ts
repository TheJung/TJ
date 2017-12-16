import { LocalDatabase } from './../db/localdb-helper';
import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { Observable, Subject, BehaviorSubject } from 'rxjs';

interface ClientSafeUserInfo {
  _id: Mongo.ObjectID,
  id: string,
  nickname: string
}

export class AuthHelper {
  private isLoggedIn: Boolean = false;

  /**
   * login - 서버에 로그인을 요청합니다. 로그인에 성공하면 인증용 jwt 토큰을 반환합니다.
   * 
   * @param id - 사용자 지정 가능한 ID 값입니다.
   * 
   * @param password - 평문의 비밀번호 입니다. 서버에서 암호화 해 비교합니다.
   */
  public async login(id: string, password: string): Promise<string> {
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
      if (err !== undefined) {
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
      if (err !== undefined) {
        console.error(err);

        return;
      }

      result = res;
    });

    return result;
  }

  /**
   * state
   */
  public async currentState(): Promise<{ valid: Boolean, uid: Mongo.ObjectID }> {
    let db = new LocalDatabase('user');
    let d: any = await db.get('latest-signed');

    let state: Promise<any> = new Promise((response, reject) => {
      Meteor.call('user.token.valid', d.token, (err, res) => {
        if (err !== undefined) {
          reject(err);
        }

        response(res);
      });
    });

    return state;
  }

  public async currentUserInfo(): Promise<ClientSafeUserInfo> {
    let db = new LocalDatabase('user');
    let signed: any = await db.get('latest-signed');

    let info: Promise<ClientSafeUserInfo> = new Promise((response, reject) => {
      Meteor.call('user.info.me', signed.token, (err, res) => {
        if (err !== undefined) {
          reject(err);
        }

        response(res);
      });
    });

    return info;
  }
  
  /**
   * logout - 로컬 데이터베이스의 저장된 토큰을 지웁니다.
   */
  public logout() {
    let db = new LocalDatabase('user');
    db.remove('latest-signed');
  }
}