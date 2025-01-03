import { Module } from '@nestjs/common';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Member, MemberSchema } from './schema/Member';

@Module({
    imports: [MongooseModule.forFeature([{ name: Member.name, schema: MemberSchema }])],
    controllers: [MemberController],
    providers: [MemberService],
})

export class MemberModule { };