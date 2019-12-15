export enum CONNECTION_ERROR {
  COMMON_SUMMARY = '通信失敗',
  COMMON_DESCRIPTION = 'インターネットに接続されているかご確認ください'
}
export enum LOGIN_ERROR {
  SUMMARY = 'ログインに失敗',
  EMAIL_OR_PASSWORD_INVALID = 'メールアドレスまたはパスワードが正しくありません'
}
export enum REGISTER_ERROR {
  SUMMARY = '新規登録に失敗',
  EMAIL_ALREADY_REGISTERED = '有効なメールアドレスを入力してください',
  DEVICE_ID_ALREADY_REGISTERED = '有効な置き配ボックスIDを入力してください'
}
export enum VALIDATION_ERROR {
  REQUIRED = '必須項目です',
  NAME_TOO_LONG = '名前は255文字以下である必要があります',
  ADDRESS_TOO_LONG = '住所は255文字以下である必要があります',
  EMAIL_INVALID = 'メールアドレスはxxx@xxx.xxxの形式である必要があります',
  PASSWORD_TOO_SHORT = 'パスワードは6文字以上である必要があります',
  PASSWORD_TOO_LONG = 'パスワードは255文字以下である必要があります',
  DEVICE_ID_INVALID = '置き配ボックスIDはxxxx-xxxx-xxxx-xxxxの形式である必要があります'
}
