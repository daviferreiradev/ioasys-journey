
import { Controller, Get, Post, Body, Param, UseGuards, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/common/decorators/roles.decorator';
import { UserRole } from 'src/user/enum/user-role.enum';
import { UserService } from 'src/user/user.service';
import { RequestWithUser } from 'src/types/express-request.interface';

@Controller('posts')
@UseGuards(AuthGuard('jwt'), RolesGuard)
export class PostController {
  constructor(
    private readonly postService: PostService,
    private readonly userService: UserService,
  ) {}

  @Post()
  @Roles(UserRole.USER)
  async create(@Body() createPostDto: CreatePostDto, @Req() req: RequestWithUser) {
    const userId = req.user.id;
    const user = await this.userService.findOne(userId);
    return this.postService.create(createPostDto, user);
  }

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postService.findOne(+id);
  }
}























// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { PostService } from './post.service';
// import { CreatePostDto } from './dto/create-post.dto';
// import { UpdatePostDto } from './dto/update-post.dto';

// @Controller('post')
// export class PostController {
//   constructor(private readonly postService: PostService) {}

//   @Post()
//   create(@Body() createPostDto: CreatePostDto) {
//     return this.postService.create(createPostDto);
//   }

//   @Get()
//   findAll() {
//     return this.postService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.postService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
//     return this.postService.update(+id, updatePostDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.postService.remove(+id);
//   }
// }