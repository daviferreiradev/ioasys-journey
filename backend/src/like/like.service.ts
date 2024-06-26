import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLikeDto } from './dto/create-like.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './entities/like.entity';
import { Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { Publish } from '../publish/entities/publish.entity';
import { UserService } from '../user/user.service';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,
    private readonly userService: UserService
  ) {}

  async create(createLikeDto: CreateLikeDto, creator: User, publish: Publish): Promise<Like> {
    if (!creator || !publish) {
      throw new Error('User or publish not found');
    }
  
    const existingLike = await this.likeRepository.findOne({ 
      where: { 
          creator: { id: creator.id }, 
          publish: { id: publish.id } 
      } 
  });
    if (existingLike) {
      throw new BadRequestException('User has already liked this post');
    }
  
    const newLike = this.likeRepository.create({
      ...createLikeDto,
      creator,
      publish,
    });
  
    try {
      return await this.likeRepository.save(newLike);
    }
    catch (error) { 
      if (error.code === '23505') { 
        throw new BadRequestException('User has already liked this post');
      }
      throw error;
    }
  }

  async removeLike(publishId: number, creatorId: number): Promise<void> {
    const like = await this.likeRepository.findOne({ where: { 
      publish: { id: publishId } , 
      creator: { id: creatorId } }, 
      relations: ['publish'] } );

    if (!like) {
      throw new NotFoundException('Like not found');
    }

    await this.likeRepository.remove(like);
  }

  findAll(): Promise<Like[]> {
    return this.likeRepository.find({ relations: ['creator', 'publish'] });
  }

  findOne(id: number): Promise<Like | null> {
    return this.likeRepository.findOne({ where: { id }, relations: ['creator', 'publish']});
  }
}
