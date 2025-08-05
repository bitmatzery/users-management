import { gql } from 'apollo-angular';
import { IUser } from '../../../interfaces';

export interface IUPDATE_USER {
  updateUser: IUser;
}

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUser: UpdateUserInput!) {
    updateUser(updateUser: $updateUser) {
      id
      name
      email
      createdAt
      updatedAt
    }
  }
`;
