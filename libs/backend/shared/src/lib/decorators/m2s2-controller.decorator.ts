import { Controller, applyDecorators } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ModuleEnum } from 'libs/backend/m2s2-server/src/lib/enums/modules.enum';
import { RouteTypeEnum } from '../enums';
import { Public } from '../guards';

export function M2S2Controller(
  module: ModuleEnum,
  controllerPath: string,
  routeType: RouteTypeEnum = RouteTypeEnum.Normal,
): ClassDecorator {
  const routePath: string = _getRouteWithPrefix(routeType, controllerPath);
  const decorators: Array<ClassDecorator | MethodDecorator | PropertyDecorator> = [ApiTags(module)];

  if (routeType === RouteTypeEnum.Normal) {
    decorators.push(ApiBearerAuth());
  } else if (routeType === RouteTypeEnum.Public) {
    decorators.push(Public());
  }

  decorators.push(Controller(routePath));
  return applyDecorators(...decorators);
}

export function _getRouteWithPrefix(routeType: RouteTypeEnum, controllerPath: string): string {
  let routePath: string;

  switch (routeType) {
    case RouteTypeEnum.Public:
      routePath = 'public/' + controllerPath;
      break;
    case RouteTypeEnum.Normal:
    default:
      routePath = controllerPath;
      break;
  }

  return routePath;
}
