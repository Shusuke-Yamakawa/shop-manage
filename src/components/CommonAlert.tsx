import { Alert } from 'react-native';

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
export const okAlert = (
  title: string,
  message: string,
  onPress: () => void,
  cancelable = false,
) => {
  Alert.alert(
    title,
    message,
    [{ text: 'OK', onPress }],
    // 画面タップ時にアラートを非表示にするかどうか（Androidのみ）
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
export const cancelAndOkAlert = (
  title: string,
  message: string,
  onPressOk: () => void,
  onPressCancel: () => void,
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
