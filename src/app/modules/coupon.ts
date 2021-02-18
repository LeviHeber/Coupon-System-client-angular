import { Injectable } from "@angular/core";
import { Company } from "./company";
import { Customer } from "./customer";

export class Coupon {

    public constructor(
        public id?:number,
        public company?:Company,
        public category?:string,
        public title?:string,
        public description?:string,
        public startDate?:Date,
        public endDate?:Date,
        public amount?:number,
        public price?:number,
        public image?:string,
        public customers?:Customer
    )
    {}
}
export enum CouponCategory{
    FOOD = "FOOD",
    ELECTRICITY = "ELECTRICITY",
    RESTAURANT = "RESTAURANT",
    VACATION = "VACATION"
}
