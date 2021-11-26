import { Alert } from 'react-native';
import { ALERT_WAITING_TIME } from '../../consts/consts';

/* 呼び出し方（例）
 * import { okAlert, cancelAndOkAlert } from '../common/CommonAlert';
 */

/* [引数]
 *
 * ~ 必須 ~
 * title: string
 * ~ 省略可能 ~
 * message: string
 * onPress: 関数
 * cancelable: boolean
 */
export const okAlert = (title, message, onPress, cancelable = false) => {
  // インジケータ表示後にダイアログを出す際に、ReactNativeのバグによってAlertがかき消されてしまうのを解消するために時間差を使う
  setTimeout(() => {
    Alert.alert(
      title,
      message,
      [{ text: 'OK', onPress }],
      // 画面タップ時にアラートを非表示にするかどうか（Androidのみ）
      { cancelable },
    );
  }, ALERT_WAITING_TIME);
};

/* [引数]
 *
 * ~ 必須 ~
 * title: string
 * ~ 省略可能 ~
 * message: string
 * onPressOk: 関数
 * onPressCancel: 関数
 * cancelable: boolean
 */
export const cancelAndOkAlert = (
  title,
  message,
  onPressOk,
  onPressCancel,
  cancelable = false,
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'キャンセル',
        onPress: onPressCancel,
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: onPressOk,
      },
    ],
    { cancelable },
  );
};

/* [引数]
 *
 * ~ 必須 ~
 * title: string
 * ~ 省略可能 ~
 * message: string
 * onPressOk: 関数
 * onPressCancel: 関数
 * cancelable: boolean
 */
export const yesNoAlert = (
  title,
  message,
  onPressOk,
  onPressCancel,
  cancelable = false,
) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'いいえ',
        onPress: onPressCancel,
        style: 'cancel',
      },
      {
        text: 'はい',
        onPress: onPressOk,
      },
    ],
    { cancelable },
  );
};
