export interface Rating {
  rating: number;
  type: string; // buyers req , post
  receiverId: any; // mongoose.Schema.Types.ObjectId;
  receiverFname: string;
  review: string;
}
