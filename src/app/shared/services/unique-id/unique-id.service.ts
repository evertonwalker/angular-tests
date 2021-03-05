import { Injectable } from "@angular/core";
import { v4 as uuidv4} from 'uuid';

@Injectable()
export class UniquedIdService {

  private numberOfGeneratedIds = 0;
  private validId =  /^[A-Za-z]+[\w\-\:\.]*$/;

  constructor(){  }

  public generateUniqueIdWithPrefix(prefix: string): string {

    // Se o prefixo exitir ou não seguir essa regra vai lançar essa exeção.
    if(!prefix || !this.validId.test(prefix)) {
      throw Error('Prefix cannot be empty');
    }

    const uniqueId =  this.generateUniqueId();
    this.numberOfGeneratedIds++;
    return `${prefix}-${uniqueId}`;
  }

  public getNumberOfGereneratedUniqueIds(): number {
    return this.numberOfGeneratedIds;
  }

  private generateUniqueId(): string {
    return uuidv4();
  }

}
