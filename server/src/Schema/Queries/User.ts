import { GraphQLList } from 'graphql';
import { UserType } from '../TypeDefs/User';
import { Users } from '../../Entities/Users';

export const GET_ALL_USER = {
    type: new GraphQLList(UserType),
    resolve() {
        return Users.find();
    }
}