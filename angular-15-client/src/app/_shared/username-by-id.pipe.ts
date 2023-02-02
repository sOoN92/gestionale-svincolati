import { HttpClient } from "@angular/common/http";
import { Pipe, PipeTransform } from "@angular/core";
import { Observable } from "rxjs";
import { UserService } from "../_services/user.service";

@Pipe({
    name: 'getUsernameById'
  })
  export class GetUsernameById implements PipeTransform {
    constructor(private userService: UserService) {}
  
    transform(id: string): Observable<any> {
      return this.userService.getUsernameById(id)
    }
  }
  

