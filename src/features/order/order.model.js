export default class OrderModel {
    constructor(userID, totalAmount, items, timestamps) {
        this.userID = userID;
        this.totalAmount = totalAmount;
        this.timestamps = timestamps;
        this.items = items;
    }
}