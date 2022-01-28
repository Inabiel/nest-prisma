
import {Post} from './post.entity'
import {Role} from './role.entity'


export class User {
  id: string ;
email: string ;
name: string ;
password: string ;
posts?: Post[] ;
roleId: string  | null;
role?: Role  | null;
}
