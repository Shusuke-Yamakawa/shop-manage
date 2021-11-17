export const getCategoryName = (categoryId: String): String => {
  switch (categoryId) {
    case '1':
      return '野菜';
    case '2':
      return '乳製品';
    case '3':
      return '肉類';
    case '4':
      return '魚類';
    case '5':
      return '卵';
    case '6':
      return '調味料';
    case '7':
      return '味の素系';
    case '8':
      return '飲料';
    default:
      return 'その他';
  }
};
