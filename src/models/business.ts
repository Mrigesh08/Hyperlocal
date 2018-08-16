import *  as firebase from 'firebase';
import { PrenormalizedTemplateMetadata } from '../../node_modules/@angular/compiler';

export class Organization {
    constructor(
        public orgRef: firebase.database.Reference,
        public orgId: string, 
        public name: string, 
        public banners: string[], 
        public theme: string,
        public lists: List[]) {}
    static async getOrganization(orgRef: firebase.database.Reference): Promise<Organization> {
        var org = await orgRef.once('value').then(snap => snap.val());
        var lists: List[];
        await orgRef.child('lists').on('value', snap => {
            snap.forEach(snap => {
                var listRef = firebase.database().ref('/lists/'+snap.val());
                List.getList(listRef).then(val => lists.push(val));
            })
        });
        return new Organization(orgRef, org.orgId, org.name, org.banners, org.theme, lists);
    }
}

export class List {
    constructor(
        public listRef: firebase.database.Reference,
        public listId: string,
        public orgId: string, 
        public name: string,
        public items: Item[]
    ) {}
    static async getList(listRef: firebase.database.Reference): Promise<List> {
        var list = await listRef.once('value').then(snap => snap.val());
        var items: Item[];
        await listRef.child('items').on('value', snap => {
            snap.forEach(snap => {
                var itemRef = firebase.database().ref('/items/'+snap.val());
                Item.getItem(itemRef).then(val => items.push(val));
            })
        })
        return new List(listRef, list.listId, list.orgId, list.name, items);
    }
}

export class Item {
    constructor(
        public itemRef: firebase.database.Reference,
        public itemId: string,
        public orgId: string,
        public name: string, 
        public price: number,
        public vegitarian: boolean,
        public available: boolean,
        public customs: CustomizationCategory[]
    ) {
        itemRef.on('child_changed', snap => {
            this.name = snap.val().name;
            this.price = snap.val().price;
            this.vegitarian = snap.val().vegitarian;
            this.available = snap.val().available;
        })
    }
    static async getItem(itemRef: firebase.database.Reference): Promise<Item> {
        var item = await itemRef.once('value').then(snap => snap.val());
        var customs: CustomizationCategory[];
        await itemRef.child('customs').on('value', snap => {
            snap.forEach(snap => {
                var custRef = firebase.database().ref('/customsCategory/'+snap.val());
                CustomizationCategory.getCustomizationCategory(custRef)
                    .then(val => customs.push(val));
            })
        })
        return new Item(itemRef, item.itemId, item.orgId, item.name, item.price, item.vegitarian, item.available, customs);
    }
}

export class CustomizationCategory {
    constructor(
        public customRef: firebase.database.Reference,
        public customId: string, 
        public itemId: string,
        public name: string, 
        public maximum: number,
        public customs: Customization[]
    ) {}
    static async getCustomizationCategory(custRef: firebase.database.Reference): Promise<CustomizationCategory> {
        var customCategory = await custRef.once('value').then(snap => snap.val());
        var customs: Customization[];
        await custRef.child('customs').on('value', snap => {
            snap.forEach(snap => {
                var custRef = firebase.database().ref('/customs/'+snap.val());
                Customization.getCustomization(custRef).then(val => customs.push(val));
            })
        })
        return new CustomizationCategory(custRef, customCategory.customId, customCategory.itemId, customCategory.name, customCategory.maximum, customs);
    }
}

export class Customization {
    constructor(
        public custRef: firebase.database.Reference,
        public custId: string,
        public itemId: string,
        public name: string, 
        public price: number
    ) {}
    static async getCustomization(custRef: firebase.database.Reference): Promise<Customization> {
        var custom = await custRef.once('value').then(snap => snap.val());
        return new Customization(custRef, custom.custId, custom.itemId, custom.name, custom.price);
    }
}
