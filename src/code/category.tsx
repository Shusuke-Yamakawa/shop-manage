import { DropList } from '../types/dropList';

export const category: DropList[] = [
  { label: '野菜', value: 'vegetable' },
  { label: '果物', value: 'fruits' },
  { label: '乳製品', value: 'milk_products' },
  { label: '肉類', value: 'meats' },
  { label: '魚類', value: 'fish' },
  { label: '卵', value: 'egg' },
  { label: '大豆', value: 'soy' },
  { label: '調味料', value: 'seasoning' },
  { label: '味の素系', value: 'soup_stock' },
  { label: '飲料', value: 'drink' },
  { label: 'その他', value: 'other' },
];

export const getCategoryName = (code: string): string => {
  const categoryUnit = category.find((item) => item.value === code);
  return categoryUnit ? categoryUnit.label : 'その他';
};
