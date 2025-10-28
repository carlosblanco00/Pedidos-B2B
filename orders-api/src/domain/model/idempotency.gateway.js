export class IdempotencyGateway {
  async getResponse(key) {
    throw new Error("Not implemented");
  }

  async saveResponse(key, target_type, target_id, response) {
    throw new Error("Not implemented");
  }
}