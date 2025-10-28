import { IdempotencyGateway } from "../../domain/model/idempotency.gateway.js";
import pool from "./mysql.js";

export class IdempotencyRepository extends IdempotencyGateway {
  async getResponse(key) {
    const [rows] = await pool.execute(
      `SELECT response_body FROM idempotency_keys WHERE \`key\` = ? AND status = 'completed'`,
      [key]
    );
    return rows[0]?.response_body || null;
  }

  async saveResponse(key, target_type, target_id, response) {
    await pool.execute(
      `INSERT INTO idempotency_keys (\`key\`, target_type, target_id, status, response_body, created_at, expires_at)
       VALUES (?, ?, ?, 'completed', ?, NOW(), DATE_ADD(NOW(), INTERVAL 1 DAY))
       ON DUPLICATE KEY UPDATE response_body = VALUES(response_body), status='completed'`,
      [key, target_type, target_id, JSON.stringify(response)]
    );
  }
}
