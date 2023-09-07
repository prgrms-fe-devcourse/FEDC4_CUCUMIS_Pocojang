import type { UserType, PostType } from '..';

export interface SearchUserType extends Array<UserType | PostType> {}
