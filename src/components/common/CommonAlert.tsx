import { Alert } from 'react-native';

/* [引数]
 *
 * ~ 必須 ~
 * title: string
 * message: string
 * onPress: 関数
 * ~ 省略可能 ~
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
 * message: string
 * onPressOk: 関数
 * onPressCancel: 関数
 * ~ 省略可能 ~
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
