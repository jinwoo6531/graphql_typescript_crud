import { GraphQLID, GraphQLString } from 'graphql';
import { MessageType } from '../TypeDefs/Messages';
import { Users } from '../../Entities/Users';
import { UserType } from '../TypeDefs/User';
import * as bcrypt from 'bcryptjs';
import { error } from 'node:console';

export const CREATE_USER = {
  type: UserType,
  args: {
    name: { type: GraphQLString },
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    let { name, username, password } = args;
    password = await hashPassword(password);
    await Users.insert({ name, username, password });

    return args;
  },
};

export const LOGIN_IN = {
  type: UserType,
  args: {
    username: { type: GraphQLString },
    password: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    let { username, password } = args;
    const user = await Users.findOne({ username });

    if (!user) {
      throw error('ID 없음');
    }

    return args;
  },
};

export const UPDATE_PASSWORD = {
  type: MessageType,
  args: {
    username: { type: GraphQLString },
    oldPassword: { type: GraphQLString },
    newPassword: { type: GraphQLString },
  },
  async resolve(parent: any, args: any) {
    const { username, oldPassword, newPassword } = args;
    const user = await Users.findOne({ username: username });

    if (!user) {
      throw new Error('USERNAME DOESNT EXIST');
    }
    const userPassword = user?.password;

    if (oldPassword === userPassword) {
      await Users.update({ username: username }, { password: newPassword });

      return { successful: true, message: 'PASSWORD UPDATED' };
    } else {
      throw new Error('PASSWORDS DO NOT MATCH!');
    }
  },
};

export const DELETE_USER = {
  type: MessageType,
  args: {
    id: { type: GraphQLID },
  },
  async resolve(parent: any, args: any) {
    const id = args.id;
    await Users.delete(id);

    return { successful: true, message: 'DELETE WORKED' };
  },
};

const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, 10);
};
