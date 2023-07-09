const db = require("../firestore");
const v4 = require("uuid");

class TokenController {
  async generateToken(data) {
    const tokenDB = db.collection("api_token");
    const token = v4();

    await tokenDB.doc(token).set({
      name: data.name,
    });

    return { name: data.name, token };
  }
}