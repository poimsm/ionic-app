import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "placeHolder"
})
export class PlaceHolderPipe implements PipeTransform {
  transform(value: string, defecto = "Sin texto") {
    return value ? value : defecto;
  }
}
