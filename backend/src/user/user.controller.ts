import { Controller, Get, Param, Body, Patch, Post, UseGuards, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express'; // Importação adicionada
import { Public } from 'src/@common/decorators/public.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('KEY_AUTH')
    @Get('me')
    async getMe(@Req() req: Request): Promise<User> {
        const userId = req.user['id']; 
        return this.userService.findOne(userId);
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth('KEY_AUTH')
    @Get()
    async findAll(): Promise<User[]> {
        return this.userService.findAll();
    }

    @ApiBearerAuth('KEY_AUTH')
    @Get(':id')
    async findOneById(@Param('id') id: number): Promise<User> {
        return this.userService.findOne(id);
    }

    @ApiBearerAuth('KEY_AUTH')
    @Get('fullName/:fullName')
    async findOne(@Param('fullName') fullName: string): Promise<User> {
        return this.userService.findOneByfullName(fullName);
    }

    @Public()
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<User> {
        return this.userService.createUser(createUserDto);
    }

    @ApiBearerAuth('KEY_AUTH')
    @Patch(':id/tags')
    async updateTagsToUser(@Param('id') id: number, @Body() body: { tags: string[] }): Promise<User> {
        return this.userService.updateTagsToUser(id, body.tags);
    }

    @ApiBearerAuth('KEY_AUTH')
    @Patch(':id/superpower')
    async updateSuperpower(@Param('id') id: number, @Body() body: { superpower: string }): Promise<User> {
        return this.userService.updateSuperpower(id, body.superpower);
    }

}
