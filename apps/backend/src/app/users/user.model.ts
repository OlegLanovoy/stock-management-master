import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUser } from './user.interface';

@Schema({ collection: 'users', timestamps: true })
export class UserModel extends Document implements IUser {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  refreshToken?: string;

  @Prop({ required: true })
  password: string;

  @Prop({
    type: [
      {
        symbol: { type: String, required: true },
        name: { type: String, required: true }
      }
    ],
    default: []
  })
  stocks: { symbol: string; name: string }[];
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
