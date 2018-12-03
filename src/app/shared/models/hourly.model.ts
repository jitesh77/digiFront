export interface Hourlyjob {
  title: string;
  description: string;
  rate: number;
  tags: Array<any>;
  duration: number;
  category: any;
  subCategory: any;
  images: Array<any>;
}

export interface HourlyOrder {
  title: string;
  description: string;
  duration: number;
}
