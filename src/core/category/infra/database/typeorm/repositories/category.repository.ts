import { CategoryRepository } from '@/core/category/domain/repositories/category.repository';
import { Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategorySchema } from '../schema/category.schema';
import { Repository } from 'typeorm';
import { Category } from '@/core/category/domain/entities/category.entity';
import { CategoryMapper } from './category-mapper';

export class CategoryRepositoryImpl implements CategoryRepository {
  constructor(
    @InjectRepository(CategorySchema)
    private readonly categoryRepository: Repository<CategorySchema>,
  ) {}

  async findCategoryByIdAndCompanyId(
    categoryId: string,
    companyId: string,
  ): Promise<Category | null> {
    const categorySchema = await this.categoryRepository.findOne({
      where: { id: categoryId, company: { id: companyId } },
    });

    if (!categorySchema) return null;

    const categoryEntity = CategoryMapper.toEntity(categorySchema);

    return categoryEntity;
  }

  async findAllByCompanyId(companyId: string): Promise<Category[]> {
    const categoriesSchema = await this.categoryRepository.find({
      where: { company: { id: companyId } },
    });

    const categoriesEntity = categoriesSchema.map((categorySchema) =>
      CategoryMapper.toEntity(categorySchema),
    );

    return categoriesEntity;
  }

  async findCategoryByNameAndCompanyId(
    categoryName: string,
    companyId: string,
  ): Promise<Category | null> {
    const categorySchema = await this.categoryRepository.findOne({
      where: { name: categoryName, company: { id: companyId } },
      relations: ['company'],
    });

    if (!categorySchema) return null;

    const categoryEntity = CategoryMapper.toEntity(categorySchema);

    return categoryEntity;
  }

  async save(entity: Category): Promise<Category> {
    const schema = await this.categoryRepository.save(entity);

    const categoryEntity = CategoryMapper.toEntity(schema);

    return categoryEntity;
  }

  async findById(id: string): Promise<Category | null> {
    const categorySchema = await this.categoryRepository.findOne({
      where: { id },
      relations: ['company', 'company.address', 'company.plan'],
    });

    if (!categorySchema) return null;

    const categoryEntity = CategoryMapper.toEntity(categorySchema);

    return categoryEntity;
  }

  async update(entity: Category): Promise<Category> {
    const schema = await this.categoryRepository.save(entity);

    const categoryEntity = CategoryMapper.toEntity(schema);

    return categoryEntity;
  }

  async delete(id: string): Promise<void> {
    await this.categoryRepository.softDelete(id);
  }
}
