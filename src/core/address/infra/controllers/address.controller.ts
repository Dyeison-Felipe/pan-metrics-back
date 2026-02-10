import { CreateAddressUseCase } from '@core/address/application/usecase/create-address.usecase';
import { UpdateAddressUseCase } from '@core/address/application/usecase/update-address.usecase';
import { Body, Controller, Post, Put } from '@nestjs/common';
import { UpdateAddressDto } from '../dtos/update-address.dto';
import { UpdateAddressPresenter } from '@shared/infra/presenter/address/update.presenter';
import { ConvertPresenter } from '@shared/infra/presenter/converter/converter.presenter';
import { CreateAddressDto } from '../dtos/create-address.dto';
import { CreateAddressPresenter } from '@shared/infra/presenter/address/create.presenter';
import {
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Address')
@Controller('/addresses/v1')
export class AddressController {
  constructor(
    private readonly createAddressUseCase: CreateAddressUseCase,
    private readonly updateAddressUseCase: UpdateAddressUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Criar endereço' })
  @ApiBody({ type: CreateAddressDto })
  @ApiCreatedResponse({ type: CreateAddressPresenter })
  async createAddress(
    @Body() body: CreateAddressDto,
  ): Promise<CreateAddressPresenter> {
    const execute = await this.createAddressUseCase.execute(body);

    const output = ConvertPresenter.toPresenter(
      execute,
      CreateAddressPresenter,
    );

    return output;
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Atualizar endereço' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateAddressDto })
  @ApiOkResponse({ type: UpdateAddressPresenter })
  async updateAddress(
    @Body() body: UpdateAddressDto,
  ): Promise<UpdateAddressPresenter> {
    const execute = await this.updateAddressUseCase.execute(body);

    const output = ConvertPresenter.toPresenter(
      execute,
      UpdateAddressPresenter,
    );

    return output;
  }
}
