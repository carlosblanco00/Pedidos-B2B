export class Order {
    static STATUSES = ["CREATED", "CONFIRMED", "CANCELED"];
  
    constructor({ id, customer_id, status, total_cents, created_at, items }) {
      if (status && !Order.STATUSES.includes(status)) {
        throw new Error(`Invalid status value: ${status}`);
      }
  
      this.id = id;
      this.customer_id = customer_id;
      this.status = status || "CREATED";
      this.total_cents = total_cents || 0;
      this.created_at = created_at || new Date();
      this.items = items || [];
    }
  }
  