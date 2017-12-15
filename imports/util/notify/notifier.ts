import { AuthHelper } from 'imports/util/auth/auth-helper';

export class Notifier {
  constructor() {}

  /**
   * notify - 새 알람을 서버에 등록합니다.
   * 
   * @param from - 알람을 발행한 무언가의 uid입니다.
   * 
   * @param receivers - 알람을 받을 User의 uid 배열입니다. 여기에 담긴 uid를 가진 사용자들에게 알람이 갑니다.
   * 
   * @param contents - 데이터 내용입니다. 어떤 내용이든 담을 수 있습니다.
   * 
   */
  public async notify(where: string, sender: Mongo.ObjectID, receiver: Mongo.ObjectID, contents: any) {
    let account = new AuthHelper();
    let me = await account.currentState();

    // uid를 반환합니다.
    let noti = new Promise((response, reject) => {
      // where: string, sender: Mongo.ObjectID, receiver: Mongo.ObjectID, contents: any
      Meteor.call('notification.register', where, sender, receiver, contents, (err, res) => {
        if (err !== undefined) {
          reject(err);
        }

        response(res);
      });
    });

    return noti;
  }

  /**
   * check - 
   */
  public check(uid: Mongo.ObjectID) {
    Meteor.call('notification.check', uid);
  }
}