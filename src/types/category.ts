export interface Category {
  id: string;
  bgImagePath: string;
  name: string;
  icon: React.FC;
  tileColor: string;
  useWhiteText?: boolean;
}
