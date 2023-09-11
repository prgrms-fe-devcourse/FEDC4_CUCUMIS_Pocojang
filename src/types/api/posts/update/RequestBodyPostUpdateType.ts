export interface RequestBodyPostUpdateType {
  postId : string;
  title : string;
  image : BinaryData | null;
  imageToDeletePublicId? : number | string;
  channelId : string;  
}

