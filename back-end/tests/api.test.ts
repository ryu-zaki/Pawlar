import request from 'supertest';
import app from '../src/index';
import pool from '../src/config/db';


afterAll(async () => {
  await pool.end();
}, 20000);

describe('API tests', () => {
    it("POST /auth/register should return the new user", async () => {
        const res = await request(app).post("/auth/register");

        expect(res.statusCode).toBe(200);
        expect(res.body).toEqual({ message: "account created successfully" })
    });
})