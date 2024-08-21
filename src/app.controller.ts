import { Controller, Get } from "@nestjs/common";

@Controller()
export class AppController {
  @Get()
  public verificarVida() {
    return "api online!";
  }
}
