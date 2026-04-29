import { Controller, Get, Query } from '@nestjs/common';
import { SearchCityPaginatedUseCase } from '../../application/usecase/search-city-paginated.usecase';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationPresenter } from '@/shared/infra/presenter/pagination/pagination.presenter';
import { CityPresenter } from '@/shared/infra/presenter/city/city.presenter';
import { FindAllSearchCityPresenter } from '@/shared/infra/presenter/city/find-all-search-city.presenter';
import { ConvertPresenter } from '@/shared/infra/presenter/converter/converter.presenter';
import { Public } from '@/shared/infra/decorators/permission.decorator';

@ApiTags('City')
@Controller('/v1/city')
export class CityController {
  constructor(
    private readonly searchCityPaginatedUseCase: SearchCityPaginatedUseCase,
  ) {}

  @Get()
  @Public()
  @ApiOperation({ summary: 'Lista todos os estados e pesquisa por nome' })
  @ApiQuery({
    name: 's',
    required: false,
    description: 'Termo de busca pelo nome da cidade',
    example: 'São Paulo, Curitiba, Porto Alegre',
  })
  @ApiQuery({
    name: 'state',
    required: true,
    description: 'Sigla do estado da(s) cidade(s) a ser buscada',
    example: 'SP, PR, RS',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    default: '1',
    description: 'Pagina da busca',
    example: '1,2,3,...',
  })
  @ApiQuery({
    name: 'limit',
    required: false,
    default: '100',
    description: 'limite de itens por página',
  })
  @ApiOkResponse({
    description: 'Cidades escontradas com sucesso',
    type: FindAllSearchCityPresenter,
    isArray: true,
  })
  @ApiNotFoundResponse({ description: 'Nenhuma cidade encontrado' })
  @ApiInternalServerErrorResponse({ description: 'Erro interno do servidor' })
  async search(
    @Query('s') search: string = '',
    @Query('state') state: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ): Promise<PaginationPresenter<FindAllSearchCityPresenter>> {
    const pagination = await this.searchCityPaginatedUseCase.execute({
      pagination: { page, limit },
      state: state,
      search: search,
    });

    const output = ConvertPresenter.toPaginationPresenter(
      pagination,
      FindAllSearchCityPresenter,
    );

    return output;
  }
}
