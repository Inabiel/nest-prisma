
import {User} from './user.entity'


export class Post {
  id: string ;
title: string ;
content: string  | null;
published: boolean ;
userId: string  | null;
user?: User  | null;
}
