export interface BuyerRequest {
  title: string;
  description: string;
  budget: number;
  tags: Array<any>;
  duration: number;
  category: any;
  subCategory: any;
}

export interface BuyerRequestModel {
  title: string;
  description: string;
  duration: number;
}
