import { Injectable } from '@angular/core';
import { Organization } from '../../models/business';
import * as firebase from 'firebase';

/*
  Generated class for the OrganizationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class OrganizationProvider {
  async getOrganization(organizationId: string): Promise<Organization> {
    var organization = await firebase.database().ref('/organizations/'+organizationId);
    return Organization.getOrganization(organization);
  }
}
