export interface Microjob {
  title: string;
  description: string;
  brDescription: string;
  price: number;
  tags: Array<any>;
  duration: number;
  category: any;
  subCategory: any;
  images: Array<any>;
}

export interface MicrojobOrder {
  title: string;
  description: string;
  duration: number;
}
